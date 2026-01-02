import os
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
from urllib.parse import quote_plus
import sys

load_dotenv()

# MongoDB Configuration from .env
MONGO_USER = os.getenv("MONGO_USER", "JobPortal")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD", "")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER", "jobportal.vrdkavz.mongodb.net")

# Auto-encode credentials
username = quote_plus(MONGO_USER)
password = quote_plus(MONGO_PASSWORD)

# Build connection string
MONGO_URI = f"mongodb+srv://{username}:{password}@{MONGO_CLUSTER}/job_portal?retryWrites=true&w=majority"

def seed_jobs():
    print("\n" + "="*60)
    print("   SEEDING IT & CORE TECH ROLES (2025-2026 BATCH)")
    print("="*60 + "\n")
    
    try:
        print(f"Connecting to MongoDB Cluster: {MONGO_CLUSTER}...")
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)
        db = client['job_portal']
        jobs_collection = db['jobs']
        
        # Test connection
        client.server_info()
        print("Connected successfully!\n")
        
        # Get starting ID
        last_job = jobs_collection.find_one(sort=[("id", -1)])
        start_id = (last_job['id'] + 1) if last_job and 'id' in last_job else 1
        
        it_fresher_jobs = [
            {
                "title": "Java Full Stack Developer Trainee",
                "company": "Enterprise Logic Solutions",
                "location": "Hyderabad / Bangalore",
                "type": "Full-time",
                "experience": "Fresher (Batch 2025)",
                "experienceLevel": "Fresher",
                "salary": "₹7 LPA - ₹12 LPA",
                "description": "Join our elite Graduate Engineering Program as a Java Full Stack Developer Trainee. This role is designed for 2025 graduates who aspire to build scalable, enterprise-grade applications. You will be part of a high-performance team working on mission-critical software systems, leveraging modern architectural patterns and best practices.",
                "responsibilities": [
                    "Develop and maintain robust backend services using Java 17+, Spring Boot 3, and Microservices architecture.",
                    "Design and implement responsive, high-fidelity user interfaces using React and Tailwind CSS.",
                    "Collaborate with architects to design database schemas and optimize SQL queries in PostgreSQL/MySQL.",
                    "Participate in the full SDLC, including requirement analysis, design, coding, testing, and deployment.",
                    "Implement automated unit and integration tests using JUnit and Mockito to ensure code quality."
                ],
                "requirements": [
                    "B.Tech/B.E in Computer Science, IT, or related fields (2025 batch only).",
                    "Strong proficiency in Core Java, Data Structures, and Algorithms.",
                    "Fundamental understanding of Spring Framework (Spring Boot, Spring Security).",
                    "Familiarity with Frontend technologies (HTML5, CSS3, JavaScript/ES6+).",
                    "Minimum 70% aggregate throughout academics with no active backlogs."
                ],
                "skills": ["Java Core", "Spring Boot", "React", "PostgreSQL", "Microservices"]
            },
            {
                "title": "Associate Java Developer (Microservices)",
                "company": "FinTech Prime",
                "location": "Pune / Remote",
                "type": "Full-time",
                "experience": "Fresher (Batch 2025/2026)",
                "experienceLevel": "Fresher",
                "salary": "₹8 LPA + Benefits",
                "description": "FinTech Prime is looking for Associate Java Developers to revolutionize our digital banking platform. You will focus on building decentralized, high-availability microservices that handle millions of transactions daily. This is a technical role requiring deep curiosity about how distributed systems scale and fail.",
                "responsibilities": [
                    "Build and scale distributed systems using Java, Spring Cloud, and Kafka.",
                    "Integrate third-party financial APIs and ensure secure data transmission/encryption.",
                    "Monitor system performance using Prometheus and Grafana, identifying bottlenecks.",
                    "Contribute to the transition from monolithic to microservices architecture.",
                    "Engage in Agile ceremonies and maintain high standards of technical documentation."
                ],
                "requirements": [
                    "Computer Science Engineering degree with a focus on Distributed Systems.",
                    "Exceptional problem-solving skills and expertise in Competitive Programming/DSA.",
                    "Knowledge of Containerization (Docker) and Orchestration (Kubernetes) is a big plus.",
                    "Solid understanding of RESTful API design principles and security.",
                    "Excellent communication skills for cross-functional collaboration."
                ],
                "skills": ["Java 17", "Docker", "REST API", "Apache Kafka", "Redis"]
            },
            
            # Python Full Stack Roles
            {
                "title": "Python Full Stack Intern (PPO Opportunity)",
                "company": "Startup Nebula",
                "location": "Remote",
                "type": "Internship",
                "experience": "Pre-final Year (Batch 2026)",
                "experienceLevel": "Fresher",
                "salary": "₹40,000 / month",
                "description": "Startup Nebula offers a high-impact internship for 2026 graduates. You won't just be 'helping' – you'll be building core features for our AI-driven productivity suite. This 6-month program is a direct path to a Full-Time Role (PPO) based on performance and culture fit.",
                "responsibilities": [
                    "Develop feature modules using Python/Django and FastAPI for high-performance endpoints.",
                    "Create dynamic and SEO-friendly web pages using Next.js 14 and Framer Motion.",
                    "Optimize frontend performance and implement complex state management using Redux Toolkit/Zustand.",
                    "Write technical blogs and documentation for new features developed during the internship.",
                    "Assist in managing CI/CD pipelines and AWS Lambda deployments."
                ],
                "requirements": [
                    "Currently pursuing B.Tech/B.E in CS/IT (Graduating in 2026).",
                    "Demonstrable projects using Python/Django or FastAPI.",
                    "Strong CSS skills (Tailwind/Sass) and an eye for modern UI/UX design.",
                    "Quick learner who can navigate an ambiguous startup environment.",
                    "Available for a 6-month full-time virtual internship."
                ],
                "skills": ["Python", "FastAPI", "React/Next.js", "Tailwind CSS", "AWS"]
            },
            {
                "title": "Cyber Security Analyst Trainee",
                "company": "Fortress Digital",
                "location": "Bangalore",
                "type": "Full-time",
                "experience": "Fresher (Batch 2025)",
                "experienceLevel": "Fresher",
                "salary": "₹9 LPA - ₹13 LPA",
                "description": "Join Fortress Digital as a Cyber Security Analyst Trainee and protect global enterprises from evolving threats. You will be trained in SOC operations, penetration testing, and security automation, eventually becoming part of our elite IR (Incident Response) team.",
                "responsibilities": [
                    "Monitor security alerts and conduct اولیه triage for potential incidents.",
                    "Perform vulnerability assessments and assist in penetration testing of web applications.",
                    "Develop scripts (Python/Bash) to automate repetitive security tasks.",
                    "Analyze logs from Firewalls, IDS/IPS, and EDR solutions.",
                    "Participate in Red Team / Blue Team exercises and security audits."
                ],
                "requirements": [
                    "B.Tech in CS with a specialization in Cloud or Information Security.",
                    "Familiarity with networking protocols (TCP/IP, DNS, HTTPS).",
                    "Basic knowledge of OWASP Top 10 vulnerabilities.",
                    "Certifications like CEH, CompTIA Security+, or CCNA are highly preferred.",
                    "Strong ethics and attention to detail."
                ],
                "skills": ["Network Security", "Metasploit", "Python", "Linux", "SOC"]
            },
            
            # AI/ML Engineering
            {
                "title": "AI/ML Engineer Trainee (LLM Focus)",
                "company": "Nexus AI Labs",
                "location": "Bangalore / Remote",
                "type": "Full-time",
                "experience": "Fresher (Batch 2025)",
                "experienceLevel": "Fresher",
                "salary": "₹12 LPA - ₹18 LPA",
                "description": "At Nexus AI Labs, we are pushing the boundaries of what is possible with Generative AI. As a Trainee, you will work on fine-tuning Large Language Models (LLMs) for specific industry use cases. This is a research-heavy engineering role for those who love math and Python.",
                "responsibilities": [
                    "Fine-tune pre-trained models (Llama 3, Mistral) using PEFT and LoRA techniques.",
                    "Develop RAG (Retrieval Augmented Generation) pipelines using Vector Databases like Pinecone.",
                    "Optimize inference speed and cost for LLM deployments.",
                    "Pre-process and curate large datasets for model training.",
                    "Stay current with AI research papers and evaluate new transformer architectures."
                ],
                "requirements": [
                    "Excellent foundation in Linear Algebra, Calculus, and Probability.",
                    "Proficiency in Python and deep learning frameworks like PyTorch or JAX.",
                    "Experience with HuggingFace ecosystem (Transformers, Datasets, PEFT).",
                    "A GitHub profile showcasing projects in NLP or ML.",
                    "B.Tech from a Tier-1 institute is preferred."
                ],
                "skills": ["PyTorch", "HuggingFace", "Vector DB", "LLM", "Python"]
            }
        ]
        
        migrated = 0
        for i, job_data in enumerate(it_fresher_jobs):
            job_doc = {
                "id": start_id + i,
                "title": job_data["title"],
                "company": job_data["company"],
                "location": job_data["location"],
                "type": job_data["type"],
                "experience": job_data["experience"],
                "experienceLevel": job_data.get("experienceLevel", "Fresher"),
                "salary": job_data["salary"],
                "postedDate": "Just now",
                "applicants": 0,
                "description": job_data["description"],
                "responsibilities": job_data.get("responsibilities", [
                    "Collaborate with cross-functional teams to define and ship new features.",
                    "Write clean, maintainable, and efficient code.",
                    "Participate in code reviews and contribute to knowledge sharing.",
                    "Stay updated with emerging trends and technologies in the industry."
                ]),
                "requirements": job_data["requirements"],
                "skills": job_data["skills"],
                "benefits": ["Competitive Pay", "Professional Mentorship", "Learning Allowances", "Flexible Working"],
                "status": "Active",
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            }
            jobs_collection.insert_one(job_doc)
            migrated += 1
            print(f"[SUCCESS] Created: {job_data['title']} at {job_data['company']}")
            
        print(f"\nSuccessfully seeded {migrated} advanced IT fresher jobs!")
        
    except Exception as e:
        import traceback
        print(f"\n[ERROR] Seeding failed: {e}")
        traceback.print_exc()
    finally:
        if 'client' in locals():
            client.close()
            print("Connection closed.")

if __name__ == "__main__":
    seed_jobs()
