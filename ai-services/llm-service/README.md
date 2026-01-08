# LLM Service

LLM-based structured data extraction service for Bills.ai.

## Features

- Extract structured data from receipt OCR text
- Support for multiple currencies
- Confidence scoring
- Versioned prompt templates
- Result validation

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Install and run Ollama (or your LLM backend):
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.com/install.sh | sh
   
   # Pull a model
   ollama pull llama2
   ```

3. Run the service:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8002
   ```

## API

### POST /extract/receipt

Extract structured data from receipt text.

**Request:**
```json
{
  "ocr_text": "Coffee $5.00\nSandwich $8.50\nSubtotal $13.50\nTax (9%) $1.22\nTotal $16.07",
  "currency": "USD"
}
```

**Response:**
```json
{
  "items": [
    {"name": "Coffee", "price": 5.00, "quantity": 1},
    {"name": "Sandwich", "price": 8.50, "quantity": 1}
  ],
  "tax_rate": 0.09,
  "service_rate": null,
  "subtotal": 13.50,
  "total": 16.07,
  "currency": "USD",
  "confidence": 0.95
}
```

## Prompt Management

Prompts are stored in `app/prompts/` directory with version numbers:
- `receipt_v1.txt` - Current version
- `receipt_v2.txt` - Next version (when iterating)

This allows:
- A/B testing of prompts
- Rollback capability
- Version tracking

## Docker

```bash
docker build -t llm-service .
docker run -p 8002:8002 llm-service
```

## Performance

- Response time: 1-5 seconds (depends on model and hardware)
- Consider GPU for production workloads
- Use smaller models (7B) for faster inference
- Cache frequent patterns

## Future Enhancements

- Support for multiple receipt formats
- Multi-language support
- Confidence-based retry logic
- Streaming responses
