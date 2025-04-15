# 🏀 FSU Player Stats Web Application

**Project URL**: [https://fsu-web-application.vercel.app](https://fsu-web-application.vercel.app)

A full-stack web application to view and filter FSU player statistics using FastAPI (backend) and React.js (frontend).

Home Screen
![image](https://github.com/user-attachments/assets/7d26d91e-42b6-40fc-bead-b87b11e34fcb)

Roster 
![image](https://github.com/user-attachments/assets/d0d70321-30b3-4025-82cf-e1dde50dc5ef)

Schedule
![image](https://github.com/user-attachments/assets/0498b248-f7c1-4ac3-b290-33ee3cc02f93)


---

## 🚀 Run Locally

### 🔧 Backend (FastAPI)

1. **Clone the repository** and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the server**:
   ```bash
   uvicorn main:app --host 127.0.0.1 --port 8000
   ```

---

### 🌐 Frontend (React.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add `.env` file**:
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000/api/v1
   ```

4. **Run the app**:
   ```bash
   npm run dev
   ```

---

## 📡 API Endpoints

### 📁 Base URL
```
/api/v1
```

### 📋 Player Stats

- `GET /player-stats`  
  List all player stats with pagination and filters:  
  - `page`, `page_size`, `player_name`, `position`, `opponent`, `season`, `game_type`, `stat_category`, `sort_by`, `sort_order`

- `GET /player-stats/{id}`  
  Get player stat by ID.

---

### 🧲 Distinct Filters (Dropdowns)

- `GET /player-stats/distinct/positions`  
  All distinct positions

- `GET /player-stats/distinct/seasons`  
  All distinct seasons

- `GET /player-stats/distinct/opponents`  
  All distinct opponents

- `GET /player-stats/distinct/game-types`  
  All distinct game types

---

### 👥 Player Roster

- `GET /player-roster`  
  Returns simplified player roster with: `playerName`, `position`, `starts`

---

## 📦 Tech Stack

- **Frontend**: React.js (Vercel Hosted)
- **Backend**: FastAPI (AWS EC2)
- **Database**: MongoDB
- **API Testing**: Postman

---

## 🛡️ Known Limitations

- Backend uses HTTP, not HTTPS (CORS & Mixed Content errors may appear in production).
- Use NGINX or a reverse proxy workaround if HTTPS setup is not possible.

---

## 👨‍💻 Author

Made with ❤️ for FSU Player Stats fans.

