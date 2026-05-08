from fastapi import APIRouter

router = APIRouter()

# Messages endpoints - to be implemented
@router.get("/conversations")
def get_conversations():
    return {"message": "Conversations endpoint - coming soon"}

@router.post("/")
def send_message():
    return {"message": "Send message endpoint - coming soon"}
