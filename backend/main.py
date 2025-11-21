from fastapi import FastAPI
from dotenv import load_dotenv
load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from .database import create_db_and_tables, engine
from .models import Destination
from sqlmodel import Session, select

def seed_data():
    with Session(engine) as session:
        existing_destinations = session.exec(select(Destination)).first()
        if not existing_destinations:
            destinations = [
                Destination(
                    name="Kyoto, Japan",
                    country="Japan",
                    description="Experience the timeless beauty of ancient temples, traditional tea ceremonies, and stunning cherry blossoms in Japan's cultural capital.",
                    image_url="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
                    tags="Culture, History, Nature",
                    rating=4.9
                ),
                Destination(
                    name="Santorini, Greece",
                    country="Greece",
                    description="Iconic white-washed buildings with blue domes overlooking the crystal clear Aegean Sea. The perfect romantic getaway.",
                    image_url="https://images.unsplash.com/photo-1613395877344-13d4c280d288?auto=format&fit=crop&w=800&q=80",
                    tags="Beach, Romance, Luxury",
                    rating=4.8
                ),
                Destination(
                    name="Machu Picchu, Peru",
                    country="Peru",
                    description="Explore the mysterious Incan citadel set high in the Andes Mountains. A breathtaking adventure for history buffs and hikers.",
                    image_url="https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
                    tags="Adventure, History, Hiking",
                    rating=4.9
                )
            ]
            for dest in destinations:
                session.add(dest)
            session.commit()

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    seed_data()
    yield

from .routes import destinations, ai_assistant

app = FastAPI(lifespan=lifespan, title="AI Travel Guide API")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destinations.router)
app.include_router(ai_assistant.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Travel Guide API"}
