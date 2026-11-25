@echo off
REM =====================================================================
REM AgroCloud AI — Full Test Suite Runner (Java 13 + Python 26 = 39 tests)
REM =====================================================================
setlocal

set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.13.21-hotspot"
set "PATH=%JAVA_HOME%\bin;C:\Users\amitm\maven\apache-maven-3.9.9\bin;%PATH%"
set "PYTHON_EXE=C:\Users\amitm\AppData\Local\Programs\Python\Python311\python.exe"
set "PYTHONPATH=%~dp0"

echo =====================================================
echo  Running AgroCloud AI Python Tests (pytest)
echo =====================================================
cd /d "%~dp0"
"%PYTHON_EXE%" -W ignore -m pytest tests/ -v --tb=short
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python tests failed!
    exit /b %ERRORLEVEL%
)

echo.
echo =====================================================
echo  Running AgroCloud AI Java Tests (Maven Surefire)
echo =====================================================
cd /d "%~dp0agrocloud-java"
call "C:\Users\amitm\maven\apache-maven-3.9.9\bin\mvn.cmd" test
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java tests failed!
    exit /b %ERRORLEVEL%
)

echo.
echo =====================================================
echo  ALL 39 TESTS PASSED SUCCESSFULLY!
echo  - Python: 26/26 (Irrigation Physics + Vision Sidecar)
echo  - Java:   13/13 (FAO-56 + Image Quality + ONNX Disease + Water Balance)
echo =====================================================

endlocal
pause
