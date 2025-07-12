prompt_text = '''
When taking clinical patient histories, several key areas are important to document thoroughly:

Chief Complaint and Present Illness
The patient's primary concern in their own words, followed by a detailed chronological account of the current symptoms 
including onset, duration, quality, severity, aggravating and relieving factors, and associated symptoms.

Past Medical History
Previous diagnoses, hospitalizations, surgeries, injuries, and chronic conditions. This provides context for current 
symptoms and helps identify patterns or risk factors.

Medications and Allergies
Current medications (including dosages, over-the-counter drugs, and supplements), previous medications, and any known 
allergies or adverse drug reactions with specific details about the nature of the reaction.

Family History
Hereditary conditions, genetic disorders, and diseases with familial tendencies in immediate family members. 
This helps assess genetic risk factors for various conditions.

Social History
Lifestyle factors including tobacco, alcohol, and substance use, occupation, living situation, sexual history, travel 
history, and social support systems. These factors significantly impact health outcomes and treatment planning.

Review of Systems
A systematic inquiry about symptoms in each body system, even if not related to the chief complaint. This helps 
identify additional problems that might otherwise be overlooked.

Immunization History
Current vaccination status, especially important for preventive care and when considering certain treatments or procedures.
The key is to be thorough yet efficient, asking open-ended questions initially and then following up with specific 
details. Active listening and creating a comfortable environment for patients to share sensitive information is equally 
important as the clinical facts gathered.

Using these kinds of factors as a template, simulate a complex case history over an extended period of time of 5-10 
years, outputting each as disparate entries.

When generating these case notes, only include follow-ups with the GP (General Practitioner). Assume the patient is 
continuing only with a single GP.

Output this as JSON to the following TypeScript schema:

type InitialClinicalPatientHistory = {
    dateAndTimeOfAppointment: string;
    importanceOrder: string[];
    chiefComplaintAndPresentIllness: string;
    pastMedicalHistory: string;
    medicationsAndAllergies: string;
    familyHistory: string;
    socialHistory: string;
    reviewOfSystems: string;
    immunizationHistory: string;
};

type PatientFollowUp = {
    dateAndTimeOfAppointment: string;
    followUpNewDetailsMarkdown: string;
    followUpAssessmentPlanMarkdown: string;
};

"importanceOrder" contains the other keys in order of importance, e.g. ["chiefComplaintAndPresentIllness", "medicationsAndAllergies", ...]
"dateAndTimeOfAppointment" contains the date and time of the appointment in "DD/MM/YYYY HH:MM:SS" 24-hour format.
'''

from gemini_api import gemini_get_basic_text_prompt_output

print(gemini_get_basic_text_prompt_output(prompt_text))

