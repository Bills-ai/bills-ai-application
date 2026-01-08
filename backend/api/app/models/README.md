# Models Directory

SQLAlchemy ORM models for the Bills.ai application.

## Structure

Each file represents a database table:

- `user.py` - User accounts
- `session.py` - Bill splitting sessions
- `document.py` - Uploaded documents/bills
- `task.py` - Async processing tasks
- `ocr_result.py` - OCR processing results
- `llm_result.py` - LLM extraction results
- `contact.py` - User contacts
- `refresh_token.py` - JWT refresh tokens

## Guidelines

- Use SQLAlchemy 2.0 style
- All models inherit from Base
- Include created_at and updated_at timestamps
- Use UUIDs for primary keys
- Define relationships clearly
