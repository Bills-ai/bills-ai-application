# Repositories Directory

Data access layer following the repository pattern.

## Purpose

Repositories encapsulate all database queries and provide a clean interface for the service layer.

## Structure

- `user_repo.py` - User CRUD operations
- `session_repo.py` - Session management
- `document_repo.py` - Document operations
- `task_repo.py` - Task management
- `contact_repo.py` - Contact list operations

## Guidelines

- One repository per model
- All database queries go through repositories
- Return domain objects, not raw queries
- Handle database exceptions at this layer
