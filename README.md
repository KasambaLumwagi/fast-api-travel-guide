# AI Travel Guide

A fullstack travel guide application with AI-powered assistance built with FastAPI and React.

## Features

- 🌍 Browse beautiful travel destinations
- 🤖 AI-powered travel assistant using DeepSeek
- 📅 Personalized itinerary generation
- 💬 Interactive chat for travel advice
- 🎨 Premium, modern UI with glassmorphism and animations

## Tech Stack

**Backend:**
- FastAPI
- SQLModel (SQLite)
- OpenAI SDK (for DeepSeek integration)

**Frontend:**
- React + Vite
- React Router
- Framer Motion (animations)
- Lucide React (icons)
- Axios

## Setup

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate the virtual environment:
```bash
venv\Scripts\activate
```

3. Create a `.env` file with your DeepSeek API key:
```
DEEPSEEK_API_KEY=your_api_key_here
```

4. Start the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## AI Capabilities

1. **Personalized Itinerary Generator**: Get day-by-day travel plans based on your interests
2. **Smart Destination Matcher**: Find destinations based on natural language descriptions
3. **Local Insight Assistant**: Ask questions about customs, safety, and hidden gems

## API Endpoints

- `GET /destinations/` - Get all destinations
- `POST /destinations/` - Create a new destination
- `GET /destinations/{id}` - Get a specific destination
- `POST /ai/chat` - Chat with the AI assistant
- `POST /ai/itinerary` - Generate a personalized itinerary

## Environment Variables

- `DEEPSEEK_API_KEY` - Your DeepSeek API key (required for AI features)
