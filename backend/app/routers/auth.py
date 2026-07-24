from fastapi import APIRouter, HTTPException
from app.database.mongodb import database
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
async def register(user: UserCreate):
    existing_user = await database.users.find_one({"email": user.email})

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hash_password(user.password)
    }

    result = await database.users.insert_one(user_data)

    return {
        "message": "User registered successfully",
        "id": str(result.inserted_id)
    }

@router.post("/login")
async def login(user: UserLogin):

    existing_user = await database.users.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        user.password,
        existing_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {
            "sub": existing_user["email"],
            "name": existing_user["name"]
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }