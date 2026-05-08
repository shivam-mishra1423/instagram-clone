from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    bio: Optional[str] = None
    is_private: bool = False

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    is_private: Optional[bool] = None

class User(UserBase):
    id: int
    profile_picture_url: Optional[str] = None
    is_verified: bool = False
    created_at: datetime
    followers_count: int = 0
    following_count: int = 0
    posts_count: int = 0

    class Config:
        orm_mode = True

# Authentication schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    username: Optional[str] = None

# Post schemas
class PostBase(BaseModel):
    caption: Optional[str] = None
    location: Optional[str] = None
    is_reel: bool = False

class PostCreate(PostBase):
    image_url: str

class PostUpdate(BaseModel):
    caption: Optional[str] = None
    location: Optional[str] = None

class Post(PostBase):
    id: int
    user_id: int
    image_url: str
    created_at: datetime
    owner: User
    likes_count: int = 0
    comments_count: int = 0
    is_liked: bool = False

    class Config:
        orm_mode = True

# Story schemas
class StoryBase(BaseModel):
    media_url: str
    media_type: str = "image"

class StoryCreate(StoryBase):
    pass

class Story(StoryBase):
    id: int
    user_id: int
    expires_at: datetime
    created_at: datetime
    owner: User

    class Config:
        orm_mode = True

# Comment schemas
class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    user_id: int
    post_id: int
    created_at: datetime
    user: User

    class Config:
        orm_mode = True

# Message schemas
class MessageBase(BaseModel):
    content: str
    message_type: str = "text"
    media_url: Optional[str] = None

class MessageCreate(MessageBase):
    receiver_id: int

class Message(MessageBase):
    id: int
    sender_id: int
    receiver_id: int
    is_read: bool
    created_at: datetime
    sender: User
    receiver: User

    class Config:
        orm_mode = True

# ML schemas
class ImageModerationRequest(BaseModel):
    image_url: str

class ImageModerationResponse(BaseModel):
    is_safe: bool
    confidence: float
    categories: List[str]

class ImageTaggingRequest(BaseModel):
    image_url: str

class ImageTaggingResponse(BaseModel):
    tags: List[str]
    confidence_scores: List[float]

class RecommendationRequest(BaseModel):
    user_id: int
    limit: int = 10

class RecommendationResponse(BaseModel):
    recommended_posts: List[int]
    recommended_users: List[int]
