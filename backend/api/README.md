# Bills.ai Backend API

FastAPI-based API Gateway for the Bills.ai application.

## Features

- User authentication with JWT
- File upload with GCS signed URLs
- OCR and LLM task orchestration
- Bill splitting calculations
- Contact management

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run migrations:
   ```bash
   alembic upgrade head
   ```

4. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## Development

API documentation available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
app/
├── main.py           # Application entry point
├── api/              # Route handlers
├── core/             # Configuration, security, logging
├── models/           # SQLAlchemy models
├── repositories/     # Data access layer
├── services/         # Business logic and external clients
└── schemas/          # Pydantic schemas
```

## Testing

```bash
pytest
```
