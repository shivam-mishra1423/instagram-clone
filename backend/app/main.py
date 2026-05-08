from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import auth, users, posts, stories, messages, ml
from .config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Instagram Clone API",
    description="Full-featured social media API with ML integration",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # Add production URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(posts.router, prefix="/api/posts", tags=["Posts"])
app.include_router(stories.router, prefix="/api/stories", tags=["Stories"])
app.include_router(messages.router, prefix="/api/messages", tags=["Messages"])
app.include_router(ml.router, prefix="/api/ml", tags=["Machine Learning"])

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "message": "Instagram Clone API is running"}

@app.get("/")
def root():
    return {"message": "Welcome to Instagram Clone API"}
