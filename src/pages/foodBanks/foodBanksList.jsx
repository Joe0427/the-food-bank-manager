import { useGetFoodBanks } from "../../hooks/useGetFoodBanks"; //use this file to read food banks
import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile
import React, { useEffect, useState } from "react";
import { useGetSpecificFoodBank } from "../../hooks/useGetFoodBanks";
import { Link } from "react-router-dom";

export const FoodBanksList = () => {
    const { name, role, userID } = useGetUserInfo()
    const { foodBanks } = useGetFoodBanks()

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
                        {foodBanks.map((foodBank) => {
                            const { name, location, foodBankID } =
                            foodBank;
                            return (
                            <div>
                                <hr></hr>
                                <h3> {name} </h3>
                                <p> location: {location} </p>
                                <p> id: {foodBankID}</p>
                                <Link to={`/add-donation/${foodBankID}`}>
                                    <button type="button">Donate</button>
                                </Link>
                            </div>
                            );
                        })}
                </ul>
            </div>
        )
    }
}