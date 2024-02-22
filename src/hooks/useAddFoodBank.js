import { addDoc, collection, serverTimestamp, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddFoodBank = () => {
    const { userID } = useGetUserInfo();

    const addFoodBank = async ({ name, location, foodAllowed }) => {
        try {
            // Check if a food bank with the same name already exists
            const foodBankRef = collection(db, "foodBanks");
            const q = query(foodBankRef, where("userID", "==", userID), where("name", "==", name));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
                // If a food bank with the same name exists, update it with the new data
                const foodBankDoc = querySnapshot.docs[0];
                await updateDoc(foodBankDoc.ref, {
                    location,
                    foodAllowed,
                    updatedAt: serverTimestamp(),
                });
                console.log("Food bank updated successfully:", foodBankDoc.id);
            } else {
                // If no food bank with the same name exists, add a new food bank
                const newFoodBankDoc = await addDoc(foodBankRef, {
                    userID,
                    name,
                    location,
                    foodAllowed,
                    createdAt: serverTimestamp(),
                });
                console.log("Food bank added successfully with ID:", newFoodBankDoc.id);
            }
        } catch (error) {
            console.error("Error adding/updating food bank:", error);
        }
    };

    return { addFoodBank };
};
