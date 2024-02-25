import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetDonations = () => {
  const [donations, setDonations] = useState([]);

  const DonationCollectionRef = collection(db, "Donations");
  const { userID } = useGetUserInfo();

  const getDonations = async () => {
    let unsubscribe;
    try {
      const queryDonations = query(
        DonationCollectionRef
      );

      unsubscribe = onSnapshot(queryDonations, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });

        setDonations(docs);
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getDonations();
  }, []);

  return { donations };
};