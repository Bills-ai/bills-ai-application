# Bills.ai Project Structure

```
bills-ai-application/
├── README.md                          # Main project documentation
├── QUICKSTART.md                      # Quick setup guide
├── CONTRIBUTING.md                    # Contribution guidelines
├── CHANGELOG.md                       # Version history
├── LICENSE                            # Apache 2.0 License
├── .gitignore                         # Git ignore rules
├── .venv/                             # Python virtual environment (root)
├── docker-compose.yml                 # Local development orchestration
│
├── Design.md                          # Technical design document
├── Plan.md                            # Implementation plan
├── Functions.md                       # Product requirements
│
├── frontend/                          # Client applications
│   ├── web/                          # Next.js web app
│   │   ├── app/                      # App Router pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── providers.tsx
│   │   │   └── globals.css
│   │   ├── components/               # React components
│   │   ├── lib/                      # Utilities
│   │   │   └── api-client.ts
│   │   ├── public/                   # Static assets
│   │   ├── styles/                   # Global styles
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tsconfig.json
│   │   ├── .env.local.example
│   │   └── Dockerfile
│   │
│   └── mobile/                       # Expo React Native app
│       ├── app/                      # Expo Router screens
│       │   ├── _layout.tsx
│       │   └── index.tsx
│       ├── components/               # React Native components
│       ├── services/                 # API clients
│       │   └── api-client.ts
│       ├── assets/                   # Images, fonts, etc.
│       ├── app.json                  # Expo configuration
│       ├── package.json
│       └── README.md
│
├── backend/                          # Backend services
│   ├── api/                         # FastAPI API Gateway
│   │   ├── app/
│   │   │   ├── main.py              # Application entry point
│   │   │   ├── api/                 # Route handlers
│   │   │   │   ├── auth.py
│   │   │   │   ├── user.py
│   │   │   │   ├── session.py
│   │   │   │   ├── document.py
│   │   │   │   ├── task.py
│   │   │   │   ├── contact.py
│   │   │   │   ├── split.py
│   │   │   │   └── health.py
│   │   │   ├── core/                # Configuration
│   │   │   │   ├── config.py
│   │   │   │   ├── security.py
│   │   │   │   └── logging.py
│   │   │   ├── models/              # SQLAlchemy models
│   │   │   │   └── README.md
│   │   │   ├── repositories/        # Data access layer
│   │   │   │   └── README.md
│   │   │   ├── services/            # Business logic
│   │   │   │   ├── gcs_client.py
│   │   │   │   ├── ocr_client.py
│   │   │   │   └── llm_client.py
│   │   │   └── schemas/             # Pydantic schemas
│   │   │       └── README.md
│   │   ├── pyproject.toml           # Poetry dependencies
│   │   ├── poetry.lock              # Locked dependencies
│   │   ├── .env.example
│   │   ├── Dockerfile
│   │   └── README.md
│   │
│   └── migrations/                  # Alembic migrations
│       └── README.md
│
├── ai-services/                     # AI processing services
│   ├── ocr-service/                # PaddleOCR service
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── ocr_engine.py
│   │   │   └── schemas.py
│   │   ├── models/                 # Model cache
│   │   ├── pyproject.toml          # Poetry dependencies
│   │   ├── Dockerfile
│   │   └── README.md
│   │
│   └── llm-service/                # LLM extraction service
│       ├── app/
│       │   ├── main.py
│       │   ├── extractor.py
│       │   ├── schemas.py
│       │   ├── validator.py
│       │   └── prompts/           # Versioned prompts
│       │       └── receipt_v1.txt
│       ├── models/                # Model cache
│       ├── pyproject.toml         # Poetry dependencies
│       ├── Dockerfile
│       └── README.md
│
├── infra/                          # Infrastructure
│   ├── k8s/                       # Kubernetes manifests
│   │   ├── api.yaml
│   │   ├── ocr.yaml
│   │   ├── llm.yaml
│   │   ├── postgres.yaml
│   │   └── README.md
│   │
│   └── env/                       # Environment configs
│       ├── dev.env
│       └── prod.env
│
└── scripts/                        # Utility scripts
    ├── init_db.sh                 # Database initialization
    ├── load_prompts.py            # Prompt management
    └── README.md

```

## Key Files by Purpose

### Development
- `docker-compose.yml` - Local development environment
- `QUICKSTART.md` - Getting started guide
- `.env.example` files - Environment configuration templates

### Documentation
- `README.md` - Main documentation for developers
- `Design.md` - Technical architecture and design
- `Plan.md` - Implementation strategy and guidelines
- `Functions.md` - Product requirements

### Configuration
- `package.json` - Node.js dependencies
- `pyproject.toml` - Python Poetry dependencies
- `poetry.lock` - Locked Python dependencies
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `app.json` - Expo configuration
- `Dockerfile` - Container definitions

### Infrastructure
- `infra/k8s/*.yaml` - Kubernetes deployment manifests
- `infra/env/*.env` - Environment-specific configuration

### Code Organization

#### Backend (FastAPI)
- `/api` - Route handlers (controllers)
- `/core` - Configuration and utilities
- `/models` - Database models
- `/repositories` - Data access layer
- `/services` - Business logic and external clients
- `/schemas` - Request/response validation

#### Frontend (Next.js)
- `/app` - Pages and layouts (App Router)
- `/components` - Reusable UI components
- `/lib` - Utilities and helpers

#### Frontend (Expo)
- `/app` - Screens (Expo Router)
- `/components` - Reusable components
- `/services` - API clients

#### AI Services
- `/app` - Service application code
- `/models` - Model cache directory
- `/prompts` - Versioned prompt templates (LLM only)

## Service Communication

```
Frontend (Web/Mobile)
    ↓
API Gateway (FastAPI) :8000
    ↓
    ├── OCR Service :8001
    ├── LLM Service :8002
    ├── PostgreSQL :5432
    ├── Redis :6379
    └── GCS (file storage)
```

## Port Assignments

- **3000** - Next.js web application
- **19000** - Expo development server
- **5432** - PostgreSQL database
- **6379** - Redis cache
- **8000** - API Gateway (FastAPI)
- **8001** - OCR Service
- **8002** - LLM Service

## Next Steps

1. Review [QUICKSTART.md](QUICKSTART.md) to set up the development environment
2. Read [README.md](README.md) for comprehensive documentation
3. Check [Design.md](Design.md) and [Plan.md](Plan.md) for architectural details
4. Start development with `docker-compose up`
