from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

def test_connection():
    print("\n" + "="*60)
    print("   MONGODB CONNECTION TEST")
    print("="*60 + "\n")
    
    if not MONGO_URI:
        print("❌ ERROR: MONGO_URI not found in .env file!")
        print("\n📝 To fix:")
        print("   1. Create a .env file in backend folder")
        print("   2. Add: MONGO_URI=mongodb+srv://...")
        return False
    
    if "<db_password>" in MONGO_URI or "YOUR_PASSWORD" in MONGO_URI:
        print("❌ ERROR: Replace YOUR_PASSWORD with actual password!")
        print("\n📝 To fix:")
        print("   1. Open backend/.env")
        print("   2. Replace YOUR_PASSWORD with real password")
        return False
    
    print("🔍 Testing connection...")
    print(f"📡 URI: {MONGO_URI[:50]}...\n")
    
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        client.server_info()
        print("✅ Connected to MongoDB Atlas!\n")
        
        databases = client.list_database_names()
        print(f"📚 Databases: {databases}\n")
        
        db = client['job_portal']
        test_coll = db['test']
        
        print("⏳ Testing write...")
        result = test_coll.insert_one({"test": "success", "timestamp": "2024-12-26"})
        print(f"✅ Write OK! ID: {result.inserted_id}\n")
        
        print("⏳ Testing read...")
        doc = test_coll.find_one({"_id": result.inserted_id})
        print(f"✅ Read OK! Data: {doc['test']}\n")
        
        print("⏳ Cleaning up...")
        test_coll.delete_one({"_id": result.inserted_id})
        print("✅ Cleanup OK!\n")
        
        collections = db.list_collection_names()
        print(f"📊 Collections: {collections if collections else 'None yet'}\n")
        
        client.close()
        
        print("="*60)
        print("   🎉 ALL TESTS PASSED!")
        print("="*60)
        print("\n✨ You can now run: python app.py\n")
        return True
        
    except Exception as e:
        print("="*60)
        print("   ❌ CONNECTION FAILED")
        print("="*60)
        print(f"\n🔴 Error: {str(e)}\n")
        
        error_str = str(e).lower()
        
        if "authentication failed" in error_str:
            print("❌ Issue: Wrong password!")
            print("\n📝 Solutions:")
            print("   1. Go to MongoDB Atlas → Database Access")
            print("   2. Edit 'JobPortal' user")
            print("   3. Reset password")
            print("   4. Update .env file with new password\n")
            
        elif "timeout" in error_str or "timed out" in error_str:
            print("❌ Issue: Network timeout!")
            print("\n📝 Solutions:")
            print("   1. Go to MongoDB Atlas → Network Access")
            print("   2. Click 'Add IP Address'")
            print("   3. Choose 'Allow Access from Anywhere' (0.0.0.0/0)")
            print("   4. Wait 2 minutes")
            print("   5. Run this script again\n")
            
        elif "getaddrinfo" in error_str:
            print("❌ Issue: DNS failed!")
            print("\n📝 Solutions:")
            print("   1. Check internet connection")
            print("   2. Try: ping jobportal.vrdkavz.mongodb.net")
            print("   3. Check firewall settings\n")
        
        else:
            print("❌ Issue: Unknown error")
            print("\n📝 General solutions:")
            print("   1. Verify MONGO_URI in .env")
            print("   2. Check password for special characters")
            print("      URL encode: @ → %40, # → %23")
            print("   3. Ensure no spaces in connection string\n")
        
        return False

if __name__ == "__main__":
    success = test_connection()
    
    if not success:
        print("\n💡 Need help?")
        print("   - Double-check MongoDB Atlas settings")
        print("   - Verify credentials are correct")
        print("   - Ensure IP is whitelisted\n")
        exit(1)