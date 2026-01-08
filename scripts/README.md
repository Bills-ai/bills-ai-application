# Scripts Directory

Utility scripts for Bills.ai development and deployment.

## Available Scripts

### init_db.sh

Initialize and migrate the database.

```bash
# Development
./scripts/init_db.sh

# Production with custom settings
DB_HOST=your-host DB_NAME=billsai DB_USER=user DB_PASSWORD=pass ./scripts/init_db.sh
```

### load_prompts.py

Manage LLM prompt templates.

```bash
# List all prompts
python scripts/load_prompts.py list

# View a specific prompt
python scripts/load_prompts.py load receipt_v1.txt

# Create a new version
python scripts/load_prompts.py version receipt_v1.txt 2
```

## Usage

Make scripts executable:

```bash
chmod +x scripts/*.sh
```

Run from project root:

```bash
./scripts/init_db.sh
python scripts/load_prompts.py list
```
