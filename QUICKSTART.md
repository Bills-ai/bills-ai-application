# Bills.ai - Quick Start Guide

This guide will help you get Bills.ai up and running locally in minutes.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for frontend development)
- Python 3.11+ (for backend development without Docker)
- Git

## Quick Start with Docker Compose

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bills-ai-application
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

   This will start:
   - PostgreSQL (port 5432)
   - Redis (port 6379)
   - OCR Service (port 8001)
   - LLM Service (port 8002)
   - API Gateway (port 8000)

3. **Initialize the database**
   ```bash
   docker-compose exec api alembic upgrade head
   ```

4. **Verify services are running**
   ```bash
   curl http://localhost:8000/health
   curl http://localhost:8001/health
   curl http://localhost:8002/health
   ```

## Frontend Development

### Web Application

```bash
cd frontend/web
npm install
npm run dev
```

Access at: http://localhost:3000

### Mobile Application

```bash
cd frontend/mobile
npm install
npx expo start
```

Scan QR code with Expo Go app on your phone.

## Manual Setup (without Docker)

### 1. PostgreSQL

```bash
# Install PostgreSQL 15
# Create database
psql -U postgres
CREATE DATABASE billsai;
CREATE USER billsai WITH PASSWORD 'billsai';
GRANT ALL PRIVILEGES ON DATABASE billsai TO billsai;
```

### 2. Backend API

```bash
cd backend/api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

### 3. OCR Service

```bash
cd ai-services/ocr-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001
```

### 4. LLM Service

```bash
# Install Ollama first
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama2

# Start service
cd ai-services/llm-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8002
```

## Testing the API

### Register a user

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Review [Design.md](Design.md) for architecture details
3. Check [Plan.md](Plan.md) for implementation guidelines
4. See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines

## Troubleshooting

### Docker services not starting

```bash
# Check logs
docker-compose logs -f

# Restart services
docker-compose restart
```

### Port already in use

```bash
# Check what's using the port (example for port 8000)
# On Linux/Mac:
lsof -i :8000

# On Windows:
netstat -ano | findstr :8000
```

### Database connection issues

- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify credentials

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review logs for error messages

Happy coding! 🚀
