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
        const getDoc = collection(db, "foodBanks")
        const docRef = await addDoc(getDoc,{})

        await setDoc(docRef,{
            hostID: userID, //user id is always from a user with role=host
            name,
            location,
            foodAllowed,
            createdAt: serverTimestamp(),
            foodBankID: docRef.id,
        })
    }
    return { addFoodBank }; //return function that you want to write into in index
}