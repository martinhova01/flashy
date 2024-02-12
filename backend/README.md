# Backend
- [Backend](#backend)
  - [REST API endpoints](#rest-api-endpoints)
    - [isRunning()](#isrunning)
    - [getProfile()](#getprofile)
    - [addNewProfile()](#addnewprofile)
    - [deleteProfile()](#deleteprofile)
    - [updateProfile()](#updateprofile)
  - [Modules](#modules)
  - [How to run](#how-to-run)
  - [Requirements](#requirements)
---
## REST API endpoints
### isRunning()
Endpoint to check if client is connected to server.
- method: `GET`
- url: `/flashy/`
- body: null
- returns: `true`if client is connected to server

### getProfile()
Attempts to get the data from a profile with the given email and password.
- method: `GET`
- url `/flashy/profiles?email="email"&password="password"`
- body: null
- returns: profile data as json
- example return data:
```json
{
    "profileId": 1,
    "email": "user1@example.com",
    "password": "password",
    "firstname": "John",
    "lastname": "Doe",
    "school": "NTNU",
    "ownedDecks": [],
    "admin": false
}
```

### addNewProfile()
Creates a new profile.
- method: `POST`
- url `/flashy/profiles"`
- body: profile data as json
- example body
```json
{
    "profileId": 0, //id does not matter
    "email": "user1@example.com",
    "password": "password",
    "firstname": "John",
    "lastname": "Doe",
    "school": "NTNU",
    "ownedDecks": [],
    "admin": false
}
```
- returns `true` if successfully created and `false` if email is already used by a profile.

### deleteProfile()
Deletes a profile with the given profile_ID.
- method: `DELETE`
- url `/flashy/profiles/"profile_ID"`
- body: null


### updateProfile()
Updates the profile with the given profile_ID.
- method: `PUT`
- url `/flashy/profiles/"profile_ID"`
- body: profile data as json
- example body:
```json
{
    "profileId": 0,
    "email": "user1@example.com",
    "password": "password",
    "firstname": "John",
    "lastname": "Doe",
    "school": "NTNU",
    "ownedDecks": [],
    "admin": false
}
```
- returns `true` if successfully updated and `false` if there exists no user with given profile_ID.

---
## Modules
- core
  - Contains the core classes with core logic for the application.
- restserver
  - Contains the rest server application and defines the REST-API for the application.
- db
  - Contains classes for communication with the database.
  
---
## How to run
- `mvn install` to compile, run tests, generate jacoco-reports
- `mvn test` to run tests
- `mvn spring-boot:run` in `backend/restserver`-folder to run restserver. The server runs on `localhost:8080/flashy/`
- `mvn checkstyle:check` to run checkstyle
- `mvn spotbugs:spotbugs` to run spotbugs

## Requirements
- Java (tested with version 17.0.8)
- Maven (tested with version 3.9.4)