from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from openai import OpenAI

router = APIRouter(prefix="/ai", tags=["ai"])

class AIRequest(BaseModel):
    prompt: str
    context: str = ""

class AIResponse(BaseModel):
    response: str

# Initialize OpenAI client for DeepSeek
# User needs to set DEEPSEEK_API_KEY environment variable
# or we can accept it in the request for security in this demo
api_key = os.environ.get("DEEPSEEK_API_KEY")
base_url = "https://api.deepseek.com"

@router.post("/chat", response_model=AIResponse)
def chat_with_ai(request: AIRequest):
    if not api_key:
        # Mock response if no key provided
        return AIResponse(response="I am an AI travel assistant. Please configure the DEEPSEEK_API_KEY to get real responses. For now: Paris is lovely this time of year!")
    
    try:
        client = OpenAI(api_key=api_key, base_url=base_url)
        
        system_prompt = """You are an expert travel guide and local insight assistant. 
        Help users plan trips, find destinations, and understand local customs.
        Be enthusiastic, practical, and concise.
        
        IMPORTANT: Format your response using Markdown.
        - Use **bold** for key terms.
        - Use bullet points for lists.
        - When mentioning a specific place or destination, ALWAYS include an image using this format:
          ![Place Name](https://source.unsplash.com/featured/?<place_name_encoded>)
          Example: ![Eiffel Tower](https://source.unsplash.com/featured/?Eiffel%20Tower)
        """
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context: {request.context}\n\nUser Question: {request.prompt}"}
        ]
        
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            temperature=0.7
        )
        
        return AIResponse(response=response.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/itinerary", response_model=AIResponse)
def generate_itinerary(request: AIRequest):
    if not api_key:
         return AIResponse(response="Mock Itinerary: Day 1: Arrival. Day 2: Sightseeing. Day 3: Departure.")

    try:
        client = OpenAI(api_key=api_key, base_url=base_url)
        
        system_prompt = """You are a travel itinerary planner. Create a detailed day-by-day itinerary based on the user's request.
        Format the output clearly with Markdown."""
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.prompt}
        ]
        
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            temperature=0.7
        )
        
        return AIResponse(response=response.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
