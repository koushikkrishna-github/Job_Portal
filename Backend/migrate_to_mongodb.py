"""
Excel to MongoDB Migration Script
Run this once to transfer existing data from students_data.xlsx to MongoDB
"""

import pandas as pd
from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
EXCEL_FILE = "students_data.xlsx"

def migrate_data():
    print("\n" + "="*60)
    print("   EXCEL TO MONGODB MIGRATION")
    print("="*60 + "\n")
    
    # Check if Excel file exists
    if not os.path.exists(EXCEL_FILE):
        print(f"❌ {EXCEL_FILE} not found!")
        print("✅ No existing data to migrate. Starting with empty database.\n")
        return
    
    try:
        print("📡 Connecting to MongoDB...")
        client = MongoClient(MONGO_URI)
        db = client['job_portal']
        collection = db['applications']
        
        # Test connection
        client.server_info()
        print("✅ Connected to MongoDB!\n")
        
        # Read Excel file
        print(f"📖 Reading data from {EXCEL_FILE}...")
        df = pd.read_excel(EXCEL_FILE)
        print(f"✅ Found {len(df)} records in Excel\n")
        
        if len(df) == 0:
            print("⚠️ Excel file is empty. No data to migrate.\n")
            return
        
        # Check for existing data
        existing_count = collection.count_documents({})
        if existing_count > 0:
            print(f"⚠️ Database already has {existing_count} records.")
            choice = input("What do you want to do?\n"
                          "  1. Append new records (keep existing)\n"
                          "  2. Replace all (DELETE existing data)\n"
                          "  3. Cancel migration\n"
                          "Enter choice (1/2/3): ")
            
            if choice == '2':
                print("\n🗑️ Deleting existing records...")
                collection.delete_many({})
                print("✅ Existing records deleted\n")
            elif choice == '3':
                print("\n❌ Migration cancelled\n")
                return
            elif choice != '1':
                print("\n❌ Invalid choice. Migration cancelled\n")
                return
        
        # Convert DataFrame to records
        records = df.to_dict('records')
        migrated = 0
        skipped = 0
        
        print("🔄 Migrating records...\n")
        
        for idx, record in enumerate(records, 1):
            # Add metadata
            record['Created At'] = datetime.now()
            
            # Convert NaN to None
            for key, value in list(record.items()):
                if pd.isna(value):
                    record[key] = None
            
            # Handle resume file path
            if 'Resume File' in record and record['Resume File']:
                resume_path = os.path.join("uploads/resumes", record['Resume File'])
                record['Resume Path'] = resume_path
                
                if not os.path.exists(resume_path):
                    print(f"⚠️ Warning: Resume file not found - {record['Resume File']}")
            
            # Ensure ID exists
            if 'ID' not in record or pd.isna(record['ID']):
                record['ID'] = idx
            
            # Ensure Status exists
            if 'Status' not in record or pd.isna(record['Status']):
                record['Status'] = 'Pending'
            
            try:
                # Insert into MongoDB
                collection.insert_one(record)
                migrated += 1
                print(f"✅ [{idx}/{len(records)}] Migrated ID: {record.get('ID')} - {record.get('Name')}")
            except Exception as e:
                print(f"❌ [{idx}/{len(records)}] Failed: {e}")
                skipped += 1
        
        # Create indexes
        print("\n🔧 Creating database indexes...")
        collection.create_index("ID", unique=True)
        collection.create_index("Email")
        collection.create_index("Position")
        collection.create_index("Status")
        collection.create_index([("Created At", -1)])
        print("✅ Indexes created successfully\n")
        
        # Summary
        print("="*60)
        print("   ✅ MIGRATION COMPLETE")
        print("="*60)
        print(f"Total records processed: {len(records)}")
        print(f"Successfully migrated: {migrated}")
        print(f"Skipped/Failed: {skipped}")
        print(f"Total in database: {collection.count_documents({})}")
        print("="*60 + "\n")
        
        # Show sample
        print("📊 Sample of migrated data:")
        sample = collection.find_one()
        if sample:
            print(f"   ID: {sample.get('ID')}")
            print(f"   Name: {sample.get('Name')}")
            print(f"   Position: {sample.get('Position')}")
            print(f"   Status: {sample.get('Status')}\n")
        
    except Exception as e:
        print(f"\n❌ Migration failed!")
        print(f"Error: {e}\n")
        return
    finally:
        client.close()
        print("🔌 Database connection closed\n")

if __name__ == "__main__":
    migrate_data()
    print("✨ Migration complete! You can now run: python app.py\n")