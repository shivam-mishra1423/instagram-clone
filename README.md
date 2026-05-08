# Instagram Clone - Full Stack Social Media App

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="TensorFlow" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

---

## 🚀 Project Overview

This repository contains a **company-ready Instagram-style clone** with:
- **React frontend** for modern UI and responsive interactions
- **FastAPI backend** for secure REST APIs
- **PostgreSQL database** for real user data storage
- **JWT authentication** with login/register
- **Machine learning endpoints** for content moderation and image tagging
- **Docker + Docker Compose** for easy local development and deployment

---

## 🧩 3D Architecture Blueprint

```
                      ┌─────────────────────────────────┐
                      │        React Frontend          │
                      │  • Feed & Explore              │
                      │  • Login/Register              │
                      │  • Stories & Messages          │
                      └─────────────────────────────────┘
                                      │
                                      ▼
                      ┌─────────────────────────────────┐
                      │         FastAPI Backend        │
                      │  • Auth / JWT                  │
                      │  • Posts / Likes / Comments    │
                      │  • Users / Follow system       │
                      │  • ML endpoints                │
                      └─────────────────────────────────┘
                                      │
                                      ▼
                      ┌─────────────────────────────────┐
                      │        PostgreSQL Database     │
                      │  • users                      │
                      │  • posts                      │
                      │  • likes                      │
                      │  • comments                   │
                      │  • messages                   │
                      └─────────────────────────────────┘
                                      │
                                      ▼
                      ┌─────────────────────────────────┐
                      │       Machine Learning Layer   │
                      │  • Content moderation          │
                      │  • Image tagging              │
                      │  • Recommendation engine       │
                      └─────────────────────────────────┘
```

---

## ✨ Features Included

### Core Instagram experience
- Social feed with post cards
- Like / comment system
- User profiles and follow/unfollow behavior
- Explore page layout
- Login and registration flow
- Stories and messages placeholder endpoints

### Real backend capabilities
- JWT-based authentication
- PostgreSQL database integration
- SQLAlchemy data models
- Dockerized backend service
- OpenAPI docs at `/docs`

### Machine learning integration
- Content moderation endpoint
- Image tagging endpoint
- Recommendation endpoint

---

## 🏗️ Project Structure

```
instagram-clone/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── auth.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routers/
│   │       ├── users.py
│   │       ├── posts.py
│   │       ├── stories.py
│   │       ├── messages.py
│   │       └── ml.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── index.js
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Explore.jsx
│   │       ├── Messages.jsx
│   │       └── Profile.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚡ Run Locally with Docker

```bash
cd instagram-clone
docker compose up --build
```

### Services started
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

---

## 🧪 Run Locally without Docker

### Backend
```bash
cd instagram-clone/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd instagram-clone/frontend
npm install
npm run dev
```

---

## 📌 Important Notes

- The backend includes a working auth system and post APIs.
- The ML endpoints are built with placeholder logic, ready to connect to real models.
- The frontend is structured for Instagram-like UX and can be extended with more pages.

---

## 🔧 What to Improve Next

1. Add real media uploads with Cloudinary or AWS S3
2. Implement story video/image carousel
3. Build real DM chat UI
4. Add notifications and search filters
5. Connect ML model with real content moderation dataset

---

## 🗒️ Summary

This README now explains the project clearly, shows the architecture in a 3D blueprint style, and includes step-by-step setup for local or Docker deployment. It is designed to be presentable for GitHub and company review.
