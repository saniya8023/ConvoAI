from fastapi import APIRouter

router = APIRouter(prefix="/conversation", tags=["conversation"])

# Endpoints will be implemented in a later phase:
# POST /conversation/start
# POST /conversation/message
# POST /conversation/respond
# GET  /conversation/history
