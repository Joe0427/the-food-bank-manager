import { addDoc, collection, serverTimestamp, setDoc, doc } from "firebase/firestore"; //to add documents to firebase into a certain collection
import { db } from "../config/firebase-config"; //access the firebase firestore database
import { useGetUserInfo } from "./useGetUserInfo"; //access user info that user hook returned

export const useAddFoodBank = () => {
    const { userID } = useGetUserInfo() //get the parameters you need from user hook data returned
    
    const addFoodBank = async ({//these parameters come from addFoodBank in onSubmit function
        name,
        location,
        foodAllowed
    }) => { 
        const docRef = await addDoc(collection(db, "foodBanks"),{
            userID, //user id is always from a user with role=host
            name,
            location,
            createdAt: serverTimestamp(),
        })
        
        await addDoc(collection(db, "foodBanks",docRef.id,"foodAllowed"),{
            foodAllowed
        })
    }
    return { addFoodBank }; //return function that you want to write into in index
}