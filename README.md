# Bills.ai - Intelligent Bill Splitting Application

## Overview

Bills.ai is a cross-platform bill-splitting application that uses OCR and LLM to automatically analyze bills and facilitate fair cost sharing among groups. The application supports multiple splitting methods and provides a seamless experience across web and mobile platforms.

## Product Features

### Core Functionality
- **User Authentication**: Email-based registration and login with automatic bill history tracking
- **Smart Bill Analysis**: OCR + LLM powered extraction of billable items, prices, tax rates, and service charges
- **Multi-Bill Sessions**: Support for multiple bills in a single session with different payers
- **Flexible Splitting Methods**:
  - AA Split (Equal distribution)
  - Percentage-based splitting
  - Item-by-item allocation (drag-and-drop interface)
  - Custom value splitting
- **Automatic Settlement**: Calculates net amounts owed between all participants
- **Contact Management**: Maintain contact lists for quick beneficiary/payer assignment

### Use Cases
- Single events: Group dinners, parties
- Multi-day trips: Travel companions, roommate expenses

## Technical Architecture

### System Overview

```
bills-ai-application/
├── frontend/           # Client applications
│   ├── web/           # Next.js web application
│   └── mobile/        # Expo React Native mobile app
├── backend/           # FastAPI API Gateway
├── ai-services/       # AI processing services
│   ├── ocr-service/   # PaddleOCR for text extraction
│   └── llm-service/   # LLM for structured data extraction
├── infra/             # Infrastructure as Code
└── scripts/           # Utility scripts
```

### Technology Stack

#### Frontend
- **Web**: Next.js 14+ (App Router), React Server Components, TanStack Query, Zustand
- **Mobile**: Expo React Native, React Navigation, SecureStore

#### Backend
- **API Gateway**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL with SQLAlchemy 2.0
- **Authentication**: JWT (Access + Refresh tokens)
- **File Storage**: Google Cloud Storage with signed URLs

#### AI Services
- **OCR**: PaddleOCR (self-hosted)
- **LLM**: Ollama / llama.cpp (self-hosted for structured extraction)

#### Infrastructure
- **Orchestration**: Kubernetes (GKE)
- **Deployment**: Docker containers
- **Monitoring**: GCP Logging, Prometheus
- **CI/CD**: GitHub Actions (recommended)

## Project Structure

```
project-root/
├── frontend/
│   ├── web/                    # Next.js Application
│   │   ├── app/               # App Router pages
│   │   ├── components/        # Reusable components
│   │   ├── lib/              # Utilities and API clients
│   │   ├── styles/           # Global styles
│   │   ├── public/           # Static assets
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── mobile/                # Expo React Native
│       ├── app/              # App screens (Expo Router)
│       ├── components/       # Reusable components
│       ├── services/         # API clients
│       ├── app.json
│       └── package.json
│
├── backend/
│   ├── api/                  # FastAPI Gateway
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── api/         # Route handlers
│   │   │   │   ├── auth.py
│   │   │   │   ├── user.py
│   │   │   │   ├── document.py
│   │   │   │   ├── task.py
│   │   │   │   ├── contact.py
│   │   │   │   └── health.py
│   │   │   ├── core/        # Configuration
│   │   │   │   ├── config.py
│   │   │   │   ├── security.py
│   │   │   │   └── logging.py
│   │   │   ├── models/      # SQLAlchemy models
│   │   │   ├── repositories/ # Data access layer
│   │   │   ├── services/    # Business logic
│   │   │   └── schemas/     # Pydantic schemas
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── migrations/           # Alembic migrations
│
├── ai-services/
│   ├── ocr-service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── ocr_engine.py
│   │   │   └── schemas.py
│   │   ├── models/          # PaddleOCR model cache
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   │
│   └── llm-service/
│       ├── app/
│       │   ├── main.py
│       │   ├── extractor.py
│       │   ├── prompts/     # Versioned prompt templates
│       │   ├── schemas.py
│       │   └── validator.py
│       ├── models/
│       ├── requirements.txt
│       └── Dockerfile
│
├── infra/
│   ├── k8s/                 # Kubernetes manifests
│   │   ├── api.yaml
│   │   ├── ocr.yaml
│   │   ├── llm.yaml
│   │   └── postgres.yaml
│   └── env/                 # Environment configs
│       ├── dev.env
│       └── prod.env
│
└── scripts/
    ├── init_db.sh
    └── load_prompts.py
```

## Database Schema

### Core Tables

```sql
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

refresh_tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token VARCHAR UNIQUE NOT NULL,
  expires_at TIMESTAMP,
  revoked BOOLEAN DEFAULT FALSE
)

sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP,
  status VARCHAR -- 'active', 'completed', 'archived'
)

documents (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  file_url VARCHAR,
  status VARCHAR, -- 'uploading', 'processing', 'completed', 'failed'
  payer_name VARCHAR,
  beneficiary_count INTEGER,
  created_at TIMESTAMP
)

tasks (
  id UUID PRIMARY KEY,
  type VARCHAR, -- 'ocr', 'llm'
  status VARCHAR, -- 'pending', 'running', 'done', 'failed'
  input_ref VARCHAR,
  output_ref VARCHAR,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
)

ocr_results (
  id UUID PRIMARY KEY,
  document_id UUID REFERENCES documents(id),
  task_id UUID REFERENCES tasks(id),
  raw_text TEXT,
  blocks JSONB,
  confidence FLOAT
)

llm_results (
  id UUID PRIMARY KEY,
  document_id UUID REFERENCES documents(id),
  task_id UUID REFERENCES tasks(id),
  items JSONB,
  tax_rate FLOAT,
  service_rate FLOAT,
  confidence FLOAT
)

contacts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  email VARCHAR,
  display_name VARCHAR,
  created_at TIMESTAMP
)
```

## API Design

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get tokens
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Revoke refresh token

### Sessions & Documents
- `POST /sessions` - Create new session
- `GET /sessions/{id}` - Get session details
- `POST /sessions/{id}/documents` - Upload document (returns signed URL)
- `GET /documents/{id}` - Get document details
- `PATCH /documents/{id}` - Update payer/beneficiary info

### Processing
- `POST /tasks/ocr` - Trigger OCR processing
- `POST /tasks/extract` - Trigger LLM extraction
- `GET /tasks/{id}` - Get task status

### Splitting
- `POST /sessions/{id}/split` - Calculate splits
- `GET /sessions/{id}/settlements` - Get final settlements

### Contacts
- `GET /contacts` - List user contacts
- `POST /contacts` - Add contact
- `DELETE /contacts/{id}` - Remove contact

## Development Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- PostgreSQL 15+

### Quick Start

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd bills-ai-application
   ```

2. **Start services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Initialize database**
   ```bash
   cd backend/api
   alembic upgrade head
   ```

4. **Start frontend (web)**
   ```bash
   cd frontend/web
   npm install
   npm run dev
   ```

5. **Start mobile development**
   ```bash
   cd frontend/mobile
   npm install
   npx expo start
   ```

### Environment Variables

#### Backend API
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/billsai
JWT_SECRET=<your-secret>
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7
GCS_BUCKET_NAME=<your-bucket>
OCR_SERVICE_URL=http://localhost:8001
LLM_SERVICE_URL=http://localhost:8002
```

#### Frontend Web
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## File Upload Flow

**Optimized approach to minimize backend load:**

1. Frontend requests presigned URL: `POST /upload/presign`
2. Backend generates GCS signed URL (valid for 15 minutes)
3. Frontend uploads file directly to GCS using PUT request
4. Frontend notifies backend of completion with file metadata
5. Backend stores reference and triggers OCR processing

This approach:
- Reduces backend bandwidth by 50%+
- Eliminates backend as bottleneck
- Provides better user experience with direct uploads

## AI Service Integration

### OCR Service API

```http
POST /ocr
Content-Type: application/json

{
  "image_url": "gs://bucket/path/to/image.jpg"
}

Response:
{
  "blocks": [
    {
      "text": "Coffee",
      "bbox": [100, 200, 300, 250],
      "confidence": 0.98
    }
  ]
}
```

### LLM Service API

```http
POST /extract/receipt
Content-Type: application/json

{
  "ocr_text": "...",
  "currency": "SGD"
}

Response:
{
  "items": [
    {
      "name": "Latte",
      "price": 6.5,
      "quantity": 1
    }
  ],
  "tax_rate": 0.09,
  "service_rate": 0.10,
  "currency": "SGD",
  "confidence": 0.93
}
```

## Security Considerations

1. **Authentication**: JWT-based with access (15 min) and refresh (7-30 days) tokens
2. **CORS**: Strict origin policies
3. **Rate Limiting**: Implemented on login, OCR, and LLM endpoints
4. **HTTPS Only**: All production traffic must use TLS
5. **Secure Storage**: Mobile tokens stored in SecureStore (not AsyncStorage)
6. **Input Validation**: All inputs validated with Pydantic schemas

## Deployment

### Development
- Docker Compose for local orchestration
- Hot reload enabled for all services

### Production (GKE)
- Kubernetes manifests in `infra/k8s/`
- Horizontal Pod Autoscaling (HPA) for OCR/LLM services
- Cloud SQL for PostgreSQL
- GCS for file storage
- Cloud Run or GKE for API Gateway

### Recommended Service Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Web Frontend | Vercel | Automatic deployments |
| Mobile | Expo EAS | OTA updates |
| API Gateway | Cloud Run → GKE | Start simple, scale to k8s |
| OCR Service | GKE | CPU-intensive, needs scaling |
| LLM Service | GKE + GPU | GPU optional for MVP |
| Database | Cloud SQL | Managed PostgreSQL |
| Storage | GCS | Native GCP integration |

## Monitoring & Observability

- **Structured Logging**: JSON format with trace IDs
- **Trace Propagation**: Frontend → Backend → AI Services
- **Metrics**: Prometheus + Grafana (optional)
- **Error Tracking**: Sentry (recommended)
- **APM**: GCP Cloud Trace

## MVP → Production Evolution

### MVP (Phase 1)
- Synchronous API with BackgroundTasks
- Single OCR/LLM instance
- Basic authentication
- Manual deployments

### Growth (Phase 2)
- Async task queue (Celery + Redis / Cloud Tasks)
- Multi-pod OCR/LLM with autoscaling
- Enhanced monitoring
- CI/CD pipeline

### Scale (Phase 3)
- Multi-tenant architecture
- Usage-based billing
- Advanced analytics
- Vector database for receipt search (optional)

## Contributing

### Code Style
- Python: Black + isort + flake8
- TypeScript: ESLint + Prettier
- Commit messages: Conventional Commits

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development
- `fix/*`: Bug fixes

### Testing
- Backend: pytest with >80% coverage
- Frontend: Jest + React Testing Library
- E2E: Playwright (web) / Detox (mobile)

## Architecture Principles

1. **Service Boundaries**: Clear separation between API Gateway and AI services
2. **Decoupling**: AI services are capability providers, not business logic owners
3. **Async by Default**: OCR/LLM operations are asynchronous with task tracking
4. **Configuration over Code**: Prompts, settings externalized
5. **Progressive Enhancement**: Start simple, add complexity when needed

## License

[Specify your license here]

## Support

For questions or issues, please contact [your-email@domain.com]

---

**Last Updated**: January 2026
**Version**: 0.1.0 (MVP)
