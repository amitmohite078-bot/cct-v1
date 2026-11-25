@echo off
REM =====================================================================
REM AgroCloud AI — Python Vision Sidecar Launcher (Option 2)
REM FastAPI / ONNX Runtime Microservice at http://127.0.0.1:8000
REM =====================================================================
setlocal

set "PYTHON_EXE=C:\Users\amitm\AppData\Local\Programs\Python\Python311\python.exe"
set "PYTHONPATH=%~dp0;%~dp0agrocloud-py"
set "AGROCLOUD_MODEL_PATH=%~dp0agrocloud-java\models\solanaceae_mobilenetv3.onnx"

echo =====================================================
echo  Starting AgroCloud AI - Python Vision Sidecar
echo  Host: 127.0.0.1:8000
echo  Docs: http://127.0.0.1:8000/docs
echo =====================================================

cd /d "%~dp0agrocloud-py"
"%PYTHON_EXE%" -m uvicorn main:app --host 127.0.0.1 --port 8000

endlocal
pause
