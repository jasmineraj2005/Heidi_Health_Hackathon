import os
from google import genai
from typing import Optional
from google.genai import types
from google.oauth2 import service_account


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/home/david/dev/Heidi_health_Hackathon/gen_lang_client.json'
credentials = service_account.Credentials.from_service_account_file(
    os.getenv("GOOGLE_APPLICATION_CREDENTIALS"),
    scopes=["https://www.googleapis.com/auth/cloud-platform"],
)
gemini_client = genai.Client(
    vertexai=True,
    credentials=credentials,
    project="gen-lang-client-0050063837",
    location="us-central1",
)


def gemini_stream_basic_text_prompt_output(
    user_prompt_text: str,
    system_prompt_text: Optional[str] = None,
    gemini_model: str = 'gemini-2.5-flash',
):
    for chunk in gemini_client.models.generate_content_stream(
        model=gemini_model,
        contents=user_prompt_text,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT"],
            response_mime_type="text/plain",
            thinking_config=types.ThinkingConfig(
                thinking_budget=2048,
            ),
            system_instruction=system_prompt_text,
            max_output_tokens=20000,
        ),
    ):
        if chunk.text:
            yield chunk.text


async def gemini_async_stream_basic_text_prompt_output(
    user_prompt_text: str,
    system_prompt_text: Optional[str] = None,
    gemini_model: str = 'gemini-2.5-flash',
):
    async for chunk in await gemini_client.aio.models.generate_content_stream(
        model=gemini_model,
        contents=user_prompt_text,
        config=types.GenerateContentConfig(
            response_modalities=["TEXT"],
            thinking_config=types.ThinkingConfig(thinking_budget=256),
            system_instruction=system_prompt_text,
            max_output_tokens=20000,
        ),
    ):
        if chunk.text:
            yield chunk.text


if __name__ == "__main__":
    for text in gemini_stream_basic_text_prompt_output(
        user_prompt_text="What is the meaning of life?",
        system_prompt_text="You are a helpful assistant.",
    ):
        print(text)
