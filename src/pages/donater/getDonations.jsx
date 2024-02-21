import { useGetDonations } from "../../hooks/useGetDonations"; //use this file to read food banks
import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile

import React, { useState } from "react";

export const GetDonations = () => {
    const { name, role } = useGetUserInfo()
    const { donations } = useGetDonations()

        return (
            <div>
                <h3> All Donations </h3>
                <ul>
                {donations.map((donation) => {
                    const {organizationName,organizationType,location} =
                    donation;
                    return (
                    <div>
                        <hr></hr>
                        <h3> {name} </h3>
                        <p> Organization Name: {organizationName} </p>
                        <p> Organization Type: {organizationType} </p>
                        <p> Location: {location} </p>
                    </div>
                    );
                })}
                </ul>
            </div>
        )
}