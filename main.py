from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import StreamingResponse
from starlette.requests import Request
from typing import List, Optional
import json
from gemini_api import gemini_get_basic_text_prompt_output, gemini_async_stream_basic_text_prompt_output
from generate_patient_histories import prompt_text


app = FastAPI(title="Patient History API", version="1.0.0")

# Configure CORS to allow cross-domain access without passwords
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Pydantic models for the API
class PatientSummaryRequest(BaseModel):
    patientName: str


class PatientSummaryResponse(BaseModel):
    patientName: str
    summary: str


class InitialClinicalPatientHistory(BaseModel):
    dateAndTimeOfAppointment: str
    importanceOrder: List[str]
    chiefComplaintAndPresentIllness: str
    pastMedicalHistory: str
    medicationsAndAllergies: str
    familyHistory: str
    socialHistory: str
    reviewOfSystems: str
    immunizationHistory: str


class PatientFollowUp(BaseModel):
    dateAndTimeOfAppointment: str
    followUpNewDetailsMarkdown: str
    followUpAssessmentPlanMarkdown: str


class PatientHistoryResponse(BaseModel):
    initialClinicalPatientHistory: InitialClinicalPatientHistory
    patientFollowUps: List[PatientFollowUp]


@app.get("/")
async def root():
    return {"message": "Patient History API is running"}


@app.post("/patient_summary", response_model=PatientSummaryResponse)
async def patient_summary(request: PatientSummaryRequest):
    """
    Generate a single-line patient summary using the patient's name.
    """
    try:
        # Create a prompt for generating a patient summary
        summary_prompt = f"""
        Generate a single-line patient summary for a patient named {request.patientName}.
        The summary should be concise and capture the most important clinical information.
        Return only the summary text, nothing else.
        """
        
        # Get the summary from Gemini
        summary = gemini_get_basic_text_prompt_output(
            user_prompt_text=summary_prompt,
            system_prompt_text="You are a medical assistant. Provide concise, professional patient summaries."
        )
        
        # Clean up the response and ensure it's a single line
        summary = summary.strip().replace('\n', ' ').replace('\r', '')
        
        return PatientSummaryResponse(
            patientName=request.patientName,
            summary=summary
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating patient summary: {str(e)}")

@app.post("/free_text_patient_summary")
async def free_text_patient_summary(request: Request):
    """
    Generate a free-text patient summary using a free-text prompt
    """
    body = await request.json()
    input_message = body.get("input_message", "")

    try:
        # Create a prompt for generating a free-text patient summary
        summary_prompt = f"""
        Generate a free-text patient summary based on the following question:
        {input_message}
        The summary should be detailed and capture all relevant clinical information.
        """
        
        # Get the summary from Gemini
        summary = gemini_async_stream_basic_text_prompt_output(
            user_prompt_text=summary_prompt,
            system_prompt_text=(
                "You are a medical assistant. Provide detailed, professional patient summaries. "
                "Always respond with github-compatible markdown format, using tables for structured data where appropriate."
            )
        )

        return StreamingResponse(
            summary,
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating free-text patient summary: {str(e)}")

@app.post("/generate_patient_history", response_model=PatientHistoryResponse)
async def generate_patient_history():
    """
    Generate a complete patient history using the existing prompt from generate_patient_histories.py
    """
    try:
        # Use the existing prompt from generate_patient_histories.py
        response_text = gemini_get_basic_text_prompt_output(prompt_text)
        
        # Parse the JSON response
        try:
            # Clean up the response text to extract JSON
            response_text = response_text.strip()
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_data = json.loads(response_text)
            
            # Validate and return the structured data
            return PatientHistoryResponse(**response_data)
            
        except json.JSONDecodeError as e:
            raise HTTPException(status_code=500, detail=f"Error parsing JSON response: {str(e)}")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating patient history: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
