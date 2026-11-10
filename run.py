"""
AgroCloud AI - Server Entrypoint & Runner
Starts FastAPI web server serving backend APIs and interactive frontend dashboard.
Includes automatic port failover if port 8000 is already in use by another service.
"""
import uvicorn
import os
import sys
import socket
import argparse

# Ensure backend directory is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

def is_port_available(port: int, host: str = "127.0.0.1") -> bool:
    """Check if the given TCP port can be bound."""
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.bind((host, port))
        s.close()
        return True
    except OSError:
        return False

def find_available_port(preferred_port: int = 8000, host: str = "127.0.0.1") -> int:
    """Return the preferred port if available; otherwise find the next free port."""
    if is_port_available(preferred_port, host):
        return preferred_port
    
    candidate_ports = [8001, 8080, 8050, 5000, 8888] + list(range(8002, 8049))
    for p in candidate_ports:
        if is_port_available(p, host):
            return p
    return preferred_port

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AgroCloud AI Web Server Runner")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", 8000)), help="Port to run on (default: 8000)")
    parser.add_argument("--host", type=str, default="127.0.0.1", help="Host interface (default: 127.0.0.1)")
    args, unknown = parser.parse_known_args()

    target_port = args.port
    if not is_port_available(target_port, args.host):
        alt_port = find_available_port(target_port, args.host)
        print(f"\n[!] Notice: Port {target_port} is already in use by another process or Windows reserved port.")
        print(f"[*] Automatically switching to available port: {alt_port}\n")
        target_port = alt_port

    print("=" * 65)
    print("  AGROCLOUD AI - GEO-SPATIAL AI CROP SUITABILITY ENGINE")
    print("=" * 65)
    print("  100% Software-Based • No IoT / Sensors Required")
    print(f"  Serving on: http://{args.host}:{target_port}")
    print(f"  API Docs:   http://{args.host}:{target_port}/docs")
    print("=" * 65)
    
    # Import app directly to avoid module path issues
    from app.main import app
    uvicorn.run(app, host=args.host, port=target_port)
