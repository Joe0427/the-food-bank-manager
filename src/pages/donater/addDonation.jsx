import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile
import { useAddDonation } from "../../hooks/useAddDonation"; //use this file to add food donaters
import { FoodBanksList } from "../foodBanks/foodBanksList";
import React, { useState, useRef } from "react";

export const AddDonation = () => {

    const { userID } = useGetUserInfo()
    const { addDonation } = useAddDonation()
    const { whenSubmit } = FoodBanksList()

    const [organizationName, setOrganizationName] = useState("");
    const [location, setLocation] = useState("");
    const organizationTypeRef = useRef()

    const onSubmit = (e) => { 
        /*function called when form tag in hostabilities is submitted 
        - addFoodBank is the variable that contains data to return to useAddFoodBank file to commit to database*/
        e.preventDefault()
        addDonation({
            userID, 
            organizationName,
            organizationType: organizationTypeRef.current.value,
            location
        }) //values here come from useState functionality
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>{whenSubmit.name}</h3>
                <button type="submit">
                    Add Donation
                </button>
            </form>
        </div>
    )
}