import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { onSnapshot, collection, query, where, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetFoodBanks = () => {
  const [foodBanks, setFoodBanks] = useState([]);

  const foodBankCollectionRef = collection(db, "foodBanks");
  const { userID, role } = useGetUserInfo();

  const removeFoodBank = async (foodBankId) => {
    try {
        await deleteDoc(doc(db, "foodBanks", foodBankId));
    } catch (error) {
        console.error("Error removing food bank: ", error);
    }
  };

  const updateFoodBank = async (foodBankId, updatedData) => {
    try {
        const foodBankRef = doc(db, "foodBanks", foodBankId);
        await updateDoc(foodBankRef, updatedData);
        console.log("Food bank updated successfully");
    } catch (error) {
        console.error("Error updating food bank: ", error);
    }
  };

  const getFoodBanks = async () => {
    let unsubscribe;
    try {
      
      if (role === "Host"){
        const queryFoodBanks = query(
          foodBankCollectionRef,
          where("userID", "==", userID),
        );

        unsubscribe = onSnapshot(queryFoodBanks, (snapshot) => {
          let docs = [];
  
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
  
            docs.push({ ...data, id });
          });
  
          setFoodBanks(docs);
        });
      } else {
        const queryFoodBanks = query(
          foodBankCollectionRef
        );
        unsubscribe = onSnapshot(queryFoodBanks, (snapshot) => {
          let docs = [];
  
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
  
            docs.push({ ...data, id });
          });
  
          setFoodBanks(docs);
        });
      }
      
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getFoodBanks();
  }, []);

  return { foodBanks, removeFoodBank, updateFoodBank };
};