import { useGetFoodBanks } from "../../hooks/useGetFoodBanks"; //use this file to read food banks
import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile
import {
    query,
    collection,
    where,
    onSnapshot,
  } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import React, { useEffect, useState } from "react";

export const FoodBanksList = () => {
    const { name, role } = useGetUserInfo()
    const { foodBanks } = useGetFoodBanks()

    const [foodBankName, setFoodBankName] = useState("");

    const whenSubmit = (e) => { 
        /*function called when form tag in hostabilities is submitted 
        - addFoodBank is the variable that contains data to return to useAddFoodBank file to commit to database*/
        e.preventDefault()
        const foodBankCollectionRef = collection(db, "foodBanks");
        const querySpecificFoodBank = query(
            foodBankCollectionRef,
            where("name", "==", foodBankName),
          );
        return querySpecificFoodBank;
    }

    useEffect((e) => {
        whenSubmit();
      }, []);

    if (role == "Host"){
        return (
            <div className="foodBanks">
                <h3> Food Banks You are Hosting </h3>
                <ul>
                {foodBanks.map((foodBank) => {
                    const { name, location } =
                    foodBank;
                    return (
                    <div>
                        <hr></hr>
                        <h3> {name} </h3>
                        <p> location: {location} </p>
                    </div>
                    );
                })}
                </ul>
            </div>
        )
    }
    
    else if (role === "Donater"){
        return (
            <div className="foodBanks">
                <h3> Food Banks You can Donate to </h3>
                <ul>
                    <form onSubmit={whenSubmit}>
                        {foodBanks.map((foodBank) => {
                            const { n, l } =
                            foodBank;
                            return (
                            <div>
                                <hr></hr>
                                <h3> {n} </h3>
                                <p> location: {l} </p>
                                <button type="Submit" onClick={setFoodBankName(n)}>Donate</button>
                            </div>
                            );
                        })}
                    </form>
                </ul>
            </div>
        )
    }
}