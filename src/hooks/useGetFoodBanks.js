import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetFoodBanks = () => {
  const [foodBanks, setFoodBanks] = useState([]);

  const foodBankCollectionRef = collection(db, "foodBanks");
  const { userID, role, location } = useGetUserInfo();

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
      } else if (role === "Donater"){
        const queryFoodBanks = query(
          foodBankCollectionRef,
          where("location", "==", location),
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

  return { foodBanks };
};