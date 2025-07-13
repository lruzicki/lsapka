import json
from typing import List, Optional, Dict
from sqlalchemy.orm import Session
from domain.druzyna import Druzyna
from domain.interfaces import DruzynaRepository
from infrastructure.db_models import DruzynaModel

class SqlAlchemyDruzynaRepository(DruzynaRepository):
    def __init__(self, db: Session):
        self.db = db
    
    def create_druzyna(self, druzyna: Druzyna) -> Druzyna:
        db_druzyna = DruzynaModel(
            nazwa=druzyna.nazwa,
            opis=druzyna.opis,
            link=druzyna.link,
            miasto=druzyna.miasto,
            dzielnica=druzyna.dzielnica,
            dokladny_adres=druzyna.dokladny_adres,
            pinezka=druzyna.pinezka
        )
        self.db.add(db_druzyna)
        self.db.commit()
        self.db.refresh(db_druzyna)
        
        return Druzyna(
            id=db_druzyna.id,
            nazwa=db_druzyna.nazwa,
            opis=db_druzyna.opis,
            link=db_druzyna.link,
            miasto=db_druzyna.miasto,
            dzielnica=db_druzyna.dzielnica,
            dokladny_adres=db_druzyna.dokladny_adres,
            pinezka=db_druzyna.pinezka,
            deleted=db_druzyna.deleted,
            created_at=db_druzyna.created_at,
            updated_at=db_druzyna.updated_at
        )
    
    def get_by_id(self, id: int) -> Optional[Druzyna]:
        db_druzyna = self.db.query(DruzynaModel).filter(
            DruzynaModel.id == id,
            DruzynaModel.deleted == False
        ).first()
        
        if not db_druzyna:
            return None
        
        return Druzyna(
            id=db_druzyna.id,
            nazwa=db_druzyna.nazwa,
            opis=db_druzyna.opis,
            link=db_druzyna.link,
            miasto=db_druzyna.miasto,
            dzielnica=db_druzyna.dzielnica,
            dokladny_adres=db_druzyna.dokladny_adres,
            pinezka=db_druzyna.pinezka,
            deleted=db_druzyna.deleted,
            created_at=db_druzyna.created_at,
            updated_at=db_druzyna.updated_at
        )
    
    def get_all_by_pinezka(self) -> Dict:
        db_druzyny = self.db.query(DruzynaModel).filter(
            DruzynaModel.deleted == False
        ).all()
        
        result = {}
        for db_druzyna in db_druzyny:
            pinezka = db_druzyna.pinezka
            if pinezka not in result:
                result[pinezka] = []
            
            druzyna = Druzyna(
                id=db_druzyna.id,
                nazwa=db_druzyna.nazwa,
                opis=db_druzyna.opis,
                link=db_druzyna.link,
                miasto=db_druzyna.miasto,
                dzielnica=db_druzyna.dzielnica,
                dokladny_adres=db_druzyna.dokladny_adres,
                pinezka=db_druzyna.pinezka,
                deleted=db_druzyna.deleted,
                created_at=db_druzyna.created_at,
                updated_at=db_druzyna.updated_at
            )
            result[pinezka].append(druzyna)
        
        return result
    
    def update_druzyna(self, druzyna: Druzyna) -> Druzyna:
        db_druzyna = self.db.query(DruzynaModel).filter(
            DruzynaModel.id == druzyna.id,
            DruzynaModel.deleted == False
        ).first()
        
        if not db_druzyna:
            raise ValueError("Drużyna nie została znaleziona")
        
        db_druzyna.nazwa = druzyna.nazwa
        db_druzyna.opis = druzyna.opis
        db_druzyna.link = druzyna.link
        db_druzyna.miasto = druzyna.miasto
        db_druzyna.dzielnica = druzyna.dzielnica
        db_druzyna.dokladny_adres = druzyna.dokladny_adres
        db_druzyna.pinezka = druzyna.pinezka
        
        self.db.commit()
        self.db.refresh(db_druzyna)
        
        return Druzyna(
            id=db_druzyna.id,
            nazwa=db_druzyna.nazwa,
            opis=db_druzyna.opis,
            link=db_druzyna.link,
            miasto=db_druzyna.miasto,
            dzielnica=db_druzyna.dzielnica,
            dokladny_adres=db_druzyna.dokladny_adres,
            pinezka=db_druzyna.pinezka,
            deleted=db_druzyna.deleted,
            created_at=db_druzyna.created_at,
            updated_at=db_druzyna.updated_at
        )
    
    def delete_druzyna(self, id: int) -> bool:
        db_druzyna = self.db.query(DruzynaModel).filter(
            DruzynaModel.id == id,
            DruzynaModel.deleted == False
        ).first()
        
        if not db_druzyna:
            return False
        
        db_druzyna.deleted = True
        self.db.commit()
        return True 