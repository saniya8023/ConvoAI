from fastapi import APIRouter

from api.routes import conversation, health

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(conversation.router)
