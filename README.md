# Flashy

## Frontend

## Backend
### Mudules
- core
  - Contains the core classes with core logic for the application.
- restserver
  - Contains the rest server application and defines the REST-API for the application.
- db
  - Contains classes for communication with the database.

### How to run
- `mvn install` to compile, run tests, generate jacoco-reports
- `mvn test` to run tests
- `mvn spring-boot:run` in `backend/restserver`-folder to run restserver. The server runs on `localhost:8080/flashy/`
- `mvn checkstyle:check` to run checkstyle
- `mvn spotbugs:spotbugs` to run spotbugs

### Reqiures
- Java (tested with version 17.0.8)
- Maven (tested with version 3.9.4)

