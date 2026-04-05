🚀 Acadza AI Recommender System
📌 Overview

This project is a full-stack AI-powered recommendation system built as part of the Acadza AI Intern Assignment.

It analyzes student performance data across multiple sessions and generates:

📊 Detailed performance analysis
🎯 Personalized study plans (DOST-based)
🏆 Leaderboard ranking system

The system simulates how an EdTech platform like Acadza can intelligently guide students preparing for JEE/NEET.

⚙️ Tech Stack
Backend
FastAPI
Python
Custom data processing + analytics
Frontend
React (Vite)
Tailwind CSS
Deployment
Backend → Render
Frontend → Vercel
🧠 Features
🔍 Student Analysis
Aggregates multiple sessions
Detects:
score trends
weak chapters
time inefficiency
behavioral patterns
Handles inconsistent marks formats
📚 Study Plan (DOST-based)

Each student gets a step-by-step plan using:

Concept revision
Formula drills
Practice assignments
Speed drills (clickingPower)
Strategy training (pickingPower)

Each step includes:

reasoning
message to student
targeted chapters
question IDs
🏆 Leaderboard

Students are ranked using a weighted scoring system based on:

average score
completion rate
attempt rate
trend
speed
🔎 Question Lookup API

Fetch questions using:

GET /question/{question_id}

Supports:

mixed _id formats
HTML cleaning
structured response
📊 Data Handling
🔄 Marks Normalization

The dataset contains inconsistent formats like:

+52 -8
68/100
34/75 (45.3%)
72

All formats are normalized into:

raw score
max score
percentage

🧪 Edge Cases Handled
Missing answers in question bank
Duplicate question IDs
Invalid difficulty values
Aborted tests
Integer question avoidance

🐞 Debug Task

The provided recommender_buggy.py had hidden logical flaws:

❌ Issues Found
Weakest chapter incorrectly identified
Question IDs mismatch (qid vs _id)
Chapter scores inflated for multi-chapter attempts

✅ Fixes
Corrected sorting logic
Normalized question ID handling
Proper score distribution per chapter

📂 Project Structure
acadza-backend/
  app/
  data/
  debug/
  sample_outputs/
  requirements.txt

acadza-frontend/
  src/
  components/
  pages/
🔗 API Endpoints
Analyze Student
POST /analyze/{student_id}
Recommend Study Plan
POST /recommend/{student_id}
Leaderboard
GET /leaderboard
Question Lookup
GET /question/{question_id}

📁 Sample Outputs

All outputs for 10 students are stored in:

sample_outputs/
  STU_001.json
  ...
  STU_010.json
  
🚀 Setup Instructions
Backend
cd acadza-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

python -m uvicorn app.main:app --reload

Frontend
cd acadza-frontend
npm install
npm run dev
Environment Variable

Create .env in frontend:

VITE_API_BASE_URL=https://acadza-backend.onrender.com
🌐 Live Deployment
Frontend: https://acadza-frontend.vercel.app/
Backend: https://acadza-backend.onrender.com

🧠 Approach

The system follows a structured pipeline:

Normalize student performance data
Identify trends and weaknesses
Prioritize weakest chapters
Map weaknesses → DOST types
Generate step-by-step learning plan
Attach relevant questions from bank
🔮 Future Improvements
Add charts (performance trends)
Smarter recommendation engine (ML-based)
Adaptive difficulty scaling
Real-time student tracking
Authentication system
🎯 Key Learnings
Handling messy real-world data is harder than building logic
Normalization is critical before analysis
Small logical bugs can break recommendation quality
Backend logic matters more than UI in data-driven systems

🙌 Final Note

This project demonstrates:

backend reasoning capability
real-world data handling
structured recommendation systems
full-stack deployment

👨‍💻 Author

Vibhas Apretwar

⭐ If you like this project, give it a star!
