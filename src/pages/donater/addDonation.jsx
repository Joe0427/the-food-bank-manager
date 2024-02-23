import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile
import { useAddDonation } from "../../hooks/useAddDonation"; //use this file to add food donaters
import { useGetSpecificFoodBank } from "../../hooks/useGetFoodBanks";
import { useParams } from "react-router-dom";

import React, { useState, useRef } from "react";

export const AddDonation = () => {

    const { userID } = useGetUserInfo()
    const { addDonation } = useAddDonation()
    const { foodBankID } = useParams()
    const { specificFoodBank } = useGetSpecificFoodBank({foodBankID})

    return (
        <div>
            <ul>
                {specificFoodBank.map((foodBank) => {
                    const { name, location, foodBankID, createdAt, foodAllowed } =
                    foodBank;
                    return (
                    <div>
                        <h3> {name} </h3>
                        <p> location: {location} </p>
                            {foodAllowed.map((food) => {
                                const { name, category} = food;
                                return (
                                <>
                                <input type="checkbox"></input><label>category:{category}, name:{name}</label><br></br>
                                </>)
                            })}
                    </div>
                    );
                })}
                </ul>
            <form>
                <button type="submit">
                    Add Donation
                </button>
            </form>
        </div>
    )
}