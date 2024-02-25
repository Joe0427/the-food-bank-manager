import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDoc,
  doc
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

export const useGetSpecificFoodBank = ({foodBankID}) => {
  const [specificFoodBank, setFoodBankName] = useState([])

  const specificFoodBankRef = collection(db, "foodBanks");

  const getFoodBank = async () => {
    let unsubscribe;
    try {
        const querySpecificFoodBank = query(
          specificFoodBankRef,
          where("foodBankID", "==", foodBankID),
        );

        unsubscribe = onSnapshot(querySpecificFoodBank, (snapshot) => {
          let docs = [];
  
          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
  
            docs.push({ ...data, id });
          });
  
          setFoodBankName(docs);
        });
      } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getFoodBank();
  }, []);

  return { specificFoodBank };
}