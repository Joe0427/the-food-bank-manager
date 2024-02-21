import { addDoc, collection, serverTimestamp, setDoc, doc } from "firebase/firestore"; //to add documents to firebase into a certain collection
import { db } from "../config/firebase-config"; //access the firebase firestore database
import { useGetUserInfo } from "./useGetUserInfo"; //access user info that user hook returned

export const useAddDonation = () => {
    const addDonation = async ({//these parameters come from addFoodBank in onSubmit function
        userID, 
        organizationName,
        organizationType,
        location
    }) => { 
        await addDoc(collection(db, "Donations"),{
            userID, 
            organizationName,
            organizationType,
            location,
            membersSince: serverTimestamp(),
        })
    }
    return { addDonation }; //return function that you want to write into in index
}