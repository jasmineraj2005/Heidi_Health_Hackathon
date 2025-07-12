# Patient History API

A FastAPI application that generates patient histories and summaries using Google's Gemini AI.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Ensure you have the Google Cloud credentials file (`gen_lang_client.json`) in the project directory.

## Running the API

Start the FastAPI server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### GET /
Health check endpoint that returns a simple message.

### POST /patient_summary
Generates a single-line patient summary.

**Request Body:**
```json
{
  "patientName": "John Smith"
}
```

**Response:**
```json
{
  "patientName": "John Smith",
  "summary": "45-year-old male with hypertension and diabetes, presenting for routine follow-up."
}
```

### POST /generate_patient_history
Generates a complete patient history with initial assessment and follow-ups.

**Response:**
Returns a structured patient history following the TypeScript schema defined in `generate_patient_histories.py`.

## CORS Configuration

The API is configured to allow cross-domain access without authentication for all origins, methods, and headers.

## Testing

Run the test script to verify all endpoints:
```bash
python test_api.py
```

## API Documentation

Once the server is running, you can access:
- Interactive API docs: `http://localhost:8000/docs`
- Alternative API docs: `http://localhost:8000/redoc`