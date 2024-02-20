"use client"

import { useEffect, useState } from "react";
import { requests } from "../utils/Api/requests";
import { ProfileDto } from "../utils/dto/ProfileDto";
import { DeckDto } from "../utils/dto/DeckDto";
import { CardDto } from "../utils/dto/CardDto";

function TestApi() {



    const [isrunning, setIsRunning] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileDto>({
        profileId: 1,
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        school: "",
        ownedDecks: [],
        admin: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {

                    //isRunning
                const isRunning = await requests.isRunning();
                console.log(isRunning);
                setIsRunning(isRunning ? true : false);

                    //getProfile
                const profile = await requests.getProfile("user1@example.com", "password");

                    //check if profile exists
                if (profile) {
                    console.log(profile);
                } else {
                    console.log("Could not get profile");
                }
                setProfile(profile);

                const exampleProfile: ProfileDto = {
                    profileId: 3,
                    email: "marius@gmail.com",
                    password: "martin",
                    firstname: "martin",
                    lastname: "høva",
                    school: "NTNU",
                    ownedDecks: [],
                    admin: false
                };

                    //addNewProfile
                const wasAdded = await requests.addNewProfile(exampleProfile);
                if (wasAdded) {
                    console.log("profile added successfully!");
                }
                else {
                    console.log("Profile was not added");
                }

                    //deleteProfile
                const wasDeleted = await requests.deleteProfile(2);
                if (wasDeleted) {
                    console.log("profile deleted successfully!");
                }
                else {
                    console.log("Profile was not deleted");
                }


                    //update profile
                const wasUpdated = await requests.updateProfile(exampleProfile);
                if (wasUpdated) {
                    console.log("profile updated successfully!");
                }
                else {
                    console.log("Profile was not updated");
                }

                const testCard: CardDto = {
                    cardNumber: 1,
                    frontpageString: "front",
                    frontpagePicture: "pic",
                    backpageString: "back",
                    backpagePicture: "pic"
                }

                const testDeck: DeckDto = {
                    deckName: "name",
                    deckId: 1,
                    cardList: [testCard]
                } 

                requests.addNewDeck(testDeck, 1);
                requests.updateDeck(testDeck);

                requests.deleteDeck(9);


            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    
    return <div>
        
        <p>isRunning: {isrunning ? "true": "false"}</p>
        <p>Profile: {profile.firstname}</p>
        
    </div>
    
}

export default TestApi;