from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from ..database import get_session
from ..models import Destination

router = APIRouter(prefix="/destinations", tags=["destinations"])

@router.post("/", response_model=Destination)
def create_destination(destination: Destination, session: Session = Depends(get_session)):
    session.add(destination)
    session.commit()
    session.refresh(destination)
    return destination

@router.get("/", response_model=List[Destination])
def read_destinations(session: Session = Depends(get_session)):
    destinations = session.exec(select(Destination)).all()
    return destinations

@router.get("/{destination_id}", response_model=Destination)
def read_destination(destination_id: int, session: Session = Depends(get_session)):
    destination = session.get(Destination, destination_id)
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")
    return destination
