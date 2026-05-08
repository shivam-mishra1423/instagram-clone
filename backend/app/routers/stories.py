from fastapi import APIRouter

router = APIRouter()

# Stories endpoints - to be implemented
@router.get("/")
def get_stories():
    return {"message": "Stories endpoint - coming soon"}

@router.post("/")
def create_story():
    return {"message": "Create story endpoint - coming soon"}
