"""
AgroCloud AI - Server Entrypoint & Runner
Starts FastAPI web server serving backend APIs and interactive frontend dashboard.
"""
import uvicorn
import os
import sys

# Ensure backend directory is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

if __name__ == "__main__":
    print("=" * 65)
    print("  AGROCLOUD AI - GEO-SPATIAL AI CROP SUITABILITY ENGINE")
    print("=" * 65)
    print("  100% Software-Based • No IoT / Sensors Required")
    print("  Serving on: http://127.0.0.1:8000")
    print("  API Docs:   http://127.0.0.1:8000/docs")
    print("=" * 65)
    
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True, app_dir=backend_dir)

