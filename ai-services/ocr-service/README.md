# OCR Service

PaddleOCR-based text extraction service for Bills.ai.

## Features

- Text detection and recognition from bill/receipt images
- Support for multiple languages (default: English)
- Angle classification for rotated images
- Structured output with bounding boxes and confidence scores

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the service:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8001
   ```

## API

### POST /ocr

Extract text from an image URL.

**Request:**
```json
{
  "image_url": "https://storage.googleapis.com/bucket/receipt.jpg"
}
```

**Response:**
```json
{
  "blocks": [
    {
      "text": "Coffee Latte",
      "confidence": 0.98,
      "bbox": [100, 200, 300, 250]
    }
  ],
  "overall_confidence": 0.95,
  "block_count": 10
}
```

## Docker

Build and run with Docker:

```bash
docker build -t ocr-service .
docker run -p 8001:8001 ocr-service
```

## Performance

- CPU mode: ~2-5 seconds per image
- GPU mode: ~0.5-1 second per image

For production, consider:
- Using GPU-enabled containers
- Caching model files in persistent volume
- Horizontal scaling with load balancer
