@echo off
REM =====================================================================
REM AgroCloud AI — Java Spring Boot Enterprise Core Launcher
REM Serves Farmer Web UI & REST API at http://localhost:8080
REM =====================================================================
setlocal

set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.13.21-hotspot"
set "PATH=%JAVA_HOME%\bin;C:\Users\amitm\maven\apache-maven-3.9.9\bin;%PATH%"

echo =====================================================
echo  Starting AgroCloud AI - Java Spring Boot Core
echo  Port: 8080
echo  Web UI: http://localhost:8080/index.html
echo =====================================================

cd /d "%~dp0agrocloud-java"

if exist "target\agrocloud-core-0.1.0-SNAPSHOT.jar" (
    echo Launching packaged JAR...
    java -jar target\agrocloud-core-0.1.0-SNAPSHOT.jar
) else (
    echo Building and launching via Maven...
    mvn spring-boot:run
)

endlocal
pause
