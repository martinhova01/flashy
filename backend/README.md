# Backend
- [Backend](#backend)
  - [REST API endpoints](#rest-api-endpoints)
    - [isRunning()](#isrunning)
    - [getProfile()](#getprofile)
    - [addNewProfile()](#addnewprofile)
    - [deleteProfile()](#deleteprofile)
    - [updateProfile()](#updateprofile)
    - [addNewDeck()](#addnewdeck)
    - [updateDeck()](#updatedeck)
    - [deleteDeck()](#deletedeck)
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
- returns: `true` if client is connected to server

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
    "ownedDecks": [
      {
        "deckName": "Sample Deck 1",
        "deckId": 6,
        "cardList": [
            {
              "cardNumber": 5,
              "frontpageString": "Sample Front Page 1",
              "backpageString": "Sample Back Page 1",
              "frontpagePicture": "front_page_picture_1.jpg",
              "backpagePicture": "back_page_picture_1.jpg"
            },
            {
              "cardNumber": 6,
              "frontpageString": "new Card",
              "backpageString": "Sample Back Page 1",
              "frontpagePicture": "front_page_picture_1.jpg",
              "backpagePicture": "back_page_picture_1.jpg"
            }
        ]
      }
    ],
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
- returns `true` if successfully updated and `false` if there exists no user with given profile_ID.


### updateProfile()
Updates the profile with the given profile_ID.
- method: `PUT`
- url `/flashy/profiles`
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

### addNewDeck()
Adds a new deck with a given ownerID.
- method: `POST`
- url: `/flashy/decks?ownerId="ownerId"`
- body: deck data as json
- example body:
```json
{
  "deckName": "Sample Deck 1",
  "deckId": 6,
  "cardList": [
    {
      "cardNumber": 5,
      "frontpageString": "Sample Front Page 1",
      "backpageString": "Sample Back Page 1",
      "frontpagePicture": "front_page_picture_1.jpg",
      "backpagePicture": "back_page_picture_1.jpg"
    }
  ]
}
```

### updateDeck()
Updates a deck(Deletes it and makes a new one).
- method: `PUT`
- url: `/flashy/decks`
- body: deck data as json
- example body:
```json
{
  "deckName": "Sample Deck 1",
  "deckId": 6,
  "cardList": [
    {
      "cardNumber": 5,
      "frontpageString": "Sample Front Page 1",
      "backpageString": "Sample Back Page 1",
      "frontpagePicture": "front_page_picture_1.jpg",
      "backpagePicture": "back_page_picture_1.jpg"
    }
  ]
}
```

### deleteDeck()
Deletes a deck with the given ID.
- method: `DELETE`
- url `/flashy/decks/"deck_ID"`
- body: null

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