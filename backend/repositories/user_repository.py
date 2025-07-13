import json
from typing import Optional
from sqlalchemy.orm import Session
from domain.user import User
from domain.interfaces import UserRepository
from infrastructure.db_models import UserModel

class SqlAlchemyUserRepository(UserRepository):
    def __init__(self, db: Session):
        self.db = db
    
    def get_by_id(self, id: str) -> Optional[User]:
        db_user = self.db.query(UserModel).filter(
            UserModel.id == id,
            UserModel.is_active == True
        ).first()
        
        if not db_user:
            return None
        
        return User(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name,
            roles=json.loads(db_user.roles),
            is_active=db_user.is_active,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        )
    
    def get_by_email(self, email: str) -> Optional[User]:
        db_user = self.db.query(UserModel).filter(
            UserModel.email == email,
            UserModel.is_active == True
        ).first()
        
        if not db_user:
            return None
        
        return User(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name,
            roles=json.loads(db_user.roles),
            is_active=db_user.is_active,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        )
    
    def create_user(self, user: User) -> User:
        db_user = UserModel(
            id=user.id,
            email=user.email,
            name=user.name,
            roles=json.dumps(user.roles),
            is_active=user.is_active
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        
        return User(
            id=db_user.id,
            email=db_user.email,
            name=db_user.name,
            roles=json.loads(db_user.roles),
            is_active=db_user.is_active,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        ) 