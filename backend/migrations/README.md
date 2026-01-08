# Backend Migrations

Alembic database migrations directory.

## Initialize Alembic

```bash
cd backend/api
alembic init migrations
```

## Create a migration

```bash
alembic revision --autogenerate -m "description"
```

## Apply migrations

```bash
# Upgrade to latest
alembic upgrade head

# Downgrade one revision
alembic downgrade -1

# Show current revision
alembic current

# Show migration history
alembic history
```

## Configuration

Edit `alembic.ini` to configure:
- Database URL
- Script location
- File template

The migration files will be stored in `migrations/versions/`.
