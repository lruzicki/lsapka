import json
from typing import List, Optional
from sqlalchemy.orm import Session
from domain.komenda import Komenda
from domain.interfaces import KomendaRepository
from infrastructure.db_models import KomendaModel

class SqlAlchemyKomendaRepository(KomendaRepository):
    def __init__(self, db: Session):
        self.db = db
    
    def create_komenda(self, komenda: Komenda) -> Komenda:
        db_komenda = KomendaModel(
            stopien=komenda.stopien,
            imie=komenda.imie,
            nazwisko=komenda.nazwisko,
            ksywka=komenda.ksywka
        )
        self.db.add(db_komenda)
        self.db.commit()
        self.db.refresh(db_komenda)
        
        return Komenda(
            id=db_komenda.id,
            stopien=db_komenda.stopien,
            imie=db_komenda.imie,
            nazwisko=db_komenda.nazwisko,
            ksywka=db_komenda.ksywka,
            deleted=db_komenda.deleted,
            created_at=db_komenda.created_at,
            updated_at=db_komenda.updated_at
        )
    
    def get_by_id(self, id: int) -> Optional[Komenda]:
        db_komenda = self.db.query(KomendaModel).filter(
            KomendaModel.id == id,
            KomendaModel.deleted == False
        ).first()
        
        if not db_komenda:
            return None
        
        return Komenda(
            id=db_komenda.id,
            stopien=db_komenda.stopien,
            imie=db_komenda.imie,
            nazwisko=db_komenda.nazwisko,
            ksywka=db_komenda.ksywka,
            deleted=db_komenda.deleted,
            created_at=db_komenda.created_at,
            updated_at=db_komenda.updated_at
        )
    
    def get_all(self) -> List[Komenda]:
        db_komenda = self.db.query(KomendaModel).filter(
            KomendaModel.deleted == False
        ).all()
        
        return [
            Komenda(
                id=db_komenda_item.id,
                stopien=db_komenda_item.stopien,
                imie=db_komenda_item.imie,
                nazwisko=db_komenda_item.nazwisko,
                ksywka=db_komenda_item.ksywka,
                deleted=db_komenda_item.deleted,
                created_at=db_komenda_item.created_at,
                updated_at=db_komenda_item.updated_at
            )
            for db_komenda_item in db_komenda
        ]
    
    def update_komenda(self, komenda: Komenda) -> Komenda:
        db_komenda = self.db.query(KomendaModel).filter(
            KomendaModel.id == komenda.id,
            KomendaModel.deleted == False
        ).first()
        
        if not db_komenda:
            raise ValueError("Komenda nie została znaleziona")
        
        db_komenda.stopien = komenda.stopien
        db_komenda.imie = komenda.imie
        db_komenda.nazwisko = komenda.nazwisko
        db_komenda.ksywka = komenda.ksywka
        
        self.db.commit()
        self.db.refresh(db_komenda)
        
        return Komenda(
            id=db_komenda.id,
            stopien=db_komenda.stopien,
            imie=db_komenda.imie,
            nazwisko=db_komenda.nazwisko,
            ksywka=db_komenda.ksywka,
            deleted=db_komenda.deleted,
            created_at=db_komenda.created_at,
            updated_at=db_komenda.updated_at
        )
    
    def delete_komenda(self, id: int) -> bool:
        db_komenda = self.db.query(KomendaModel).filter(
            KomendaModel.id == id,
            KomendaModel.deleted == False
        ).first()
        
        if not db_komenda:
            return False
        
        db_komenda.deleted = True
        self.db.commit()
        return True 