prompt_text = '''
When taking a clinical patient history over an extended period (5-10 years), it is essential to document a comprehensive and thorough record. Each follow-up should detail the patient's condition and progress with their General Practitioner (GP). The following areas should be covered during the patient history collection:

1. Chief Complaint and Present Illness: 
    Document the patient's primary concern, expressed in their own words.
    Provide a detailed account of symptoms, including:
    - Onset
    - Duration
    - Quality
    - Severity
    - Aggravating and relieving factors
    - Associated symptoms

2. Past Medical History:
    - Include previous diagnoses, hospitalizations, surgeries, injuries, chronic conditions, and relevant treatments.
    - This context helps to identify potential patterns or risk factors for the current symptoms.

3. Medications and Allergies:
    - List all current medications, dosages, over-the-counter drugs, and supplements.
    - Include details about past medications and any allergies or adverse drug reactions, specifying the type of reaction.

4. Family History:
    - Record any hereditary conditions, genetic disorders, or diseases present in immediate family members.
    This provides insight into potential genetic risk factors.

5. Social History:
    - Include lifestyle factors such as:
    - Tobacco use
    - Alcohol and substance use
    - Occupation
    - Living situation
    - Sexual history
    - Travel history
    - Social support systems
    These factors can significantly impact health outcomes.

6. Review of Systems:
    - Conduct a thorough inquiry into symptoms across all body systems, even if they are not directly related to the chief complaint.
    - This helps identify other possible conditions that may have been overlooked.

7. Immunization History:
    - Include details about current vaccination status, especially for preventive care and relevant treatments.

Format:
- First Name: Patient's first name
- Last Name: Patient's last name
- Gender: Male/Female/Trans
- Age: The patient's age
- Ethnicity: The patient's ethnic background
- Date and Time of Appointment (in 24-hour format: "DD/MM/YYYY HH:MM:SS")
- Importance Order: List all the sections in order of importance based on the patient's condition (e.g., ["chiefComplaintAndPresentIllness", "medicationsAndAllergies", "reviewOfSystems", etc.]).
- Chief Complaint and Present Illness: A detailed description of the primary complaint and current symptoms, including key dates and events.
- Past Medical History: Document previous diagnoses, conditions, surgeries, etc.
- Medications and Allergies: Include medications, dosages, and allergies.
- Family History: Include relevant familial conditions or genetic factors.
- Social History: Lifestyle factors affecting the patient's health.
- Review of Systems: A detailed check of symptoms across all body systems.
- Immunization History: Document vaccination status.

For Follow-Up Appointments:
- Follow-Up New Details: Include any new symptoms, diagnoses, medications, or conditions since the previous appointment. The information should be presented as a Markdown-formatted summary.
- Follow-Up Assessment/Plan: Provide a summary of the GP's assessment and the plan moving forward. This should also be formatted in Markdown.

Output Format:

Output this as JSON to the following TypeScript schema:

type InitialClinicalPatientHistory = {
    first_name: string;
    last_name: string;
    gender: string;
    age: integer; 
    ethnicity: string;
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

You should output as the following type:

type Output = {
    initialClinicalPatientHistory: InitialClinicalPatientHistory;
    patientFollowUps: PatientFollowUp[];
};
'''

# from gemini_api import gemini_get_basic_text_prompt_output

# print(gemini_get_basic_text_prompt_output(prompt_text))
