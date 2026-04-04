import os
import logging
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

_supabase_client: Client | None = None


def get_supabase() -> Client:
    """
    Returns a singleton Supabase client using the SERVICE ROLE key.
    The service role key bypasses Row Level Security so the backend
    can freely insert into trigger_data without auth headers.
    """
    global _supabase_client
    if _supabase_client is None:
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

        if not url or not key:
            raise EnvironmentError(
                "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env"
            )

        _supabase_client = create_client(url, key)
        logger.info("Supabase client initialized successfully.")

    return _supabase_client
