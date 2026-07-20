# HR Policy Assistant

A full-stack HR policy assistant with a FastAPI backend, a React/Vite frontend, LangChain-powered retrieval, and Chroma vector storage.

## Project Structure

```text
hr-policy-assistant/
|-- backend/
|   |-- main.py
|   |-- api/
|   |-- services/
|   |-- rag/
|   |-- requirements.txt
|   |-- .env.example
|   `-- Dockerfile
|-- frontend/
|   |-- package.json
|   |-- src/
|   `-- Dockerfile
|-- docker-compose.yml
|-- .gitignore
|-- README.md
`-- LICENSE
```

## Local Development

Backend:

```powershell
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend at `http://localhost:5173` and add your OpenRouter API key in Settings.

## Docker

From the project root:

```powershell
docker compose up --build
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000`

The compose file mounts `backend/documents` and `backend/chroma_db` so uploaded documents and vector data persist locally.
For production hosting, build the frontend with `VITE_API_BASE_URL` set to the public backend URL.

```powershell
docker compose build --build-arg VITE_API_BASE_URL=https://your-backend-domain.example
```


