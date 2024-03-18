CREATE TABLE deck
(
    deck_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR(50),
    owner_id    INTEGER,
    is_public   BOOLEAN,
    category    VARCHAR(50),
    FOREIGN KEY (owner_id) REFERENCES profile(profile_id) ON DELETE CASCADE
);

CREATE TABLE profile
(
    profile_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    email       VARCHAR(320),
    password    VARCHAR(320),
    firstname   VARCHAR(50),
    lastname    VARCHAR(50),
    school      VARCHAR(50),
    is_admin    BOOLEAN DEFAULT false
);

CREATE TABLE card
(
    card_id             INTEGER,
    front_page          VARCHAR(2000),
    front_page_picture  TEXT,
    back_page           VARCHAR(2000),
    back_page_picture   TEXT,
    deck_id             INTEGER,
    PRIMARY KEY (card_id, deck_id)
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE
);

CREATE TABLE user_like
(
    deck_id              INTEGER,
    profile_id           INTEGER,
    PRIMARY KEY (deck_id, profile_id),
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON DELETE CASCADE
);

CREATE TABLE favorite
(
    deck_id              INTEGER,
    profile_id           INTEGER,
    PRIMARY KEY (deck_id, profile_id),
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE,
    FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON DELETE CASCADE
);

CREATE TABLE comments
(   
    profile_id            INTEGER,
    deck_id               INTEGER,
    comment             VARCHAR(2083),
    FOREIGN KEY (profile_id) REFERENCES profile(profile_id) ON DELETE CASCADE,
    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, deck_id, comment)
);

