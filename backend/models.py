from typing import Optional
from sqlmodel import Field, SQLModel

class Destination(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    country: str
    description: str
    image_url: str
    tags: str # Comma separated tags like "beach,history"
    rating: float = Field(default=0.0)
