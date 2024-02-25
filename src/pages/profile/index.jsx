import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile
import React, { useState } from "react";

export const Profile = () => {
    const { name, profilePhoto, userID, role, isAuth, organizationName, location, organizationType } = useGetUserInfo()

    //host can create foodbanks and show foodbanks in their profile (will show them later)
    return (
        <>
            <div> {name}'s profile </div> 
            <div> You are a {role}</div> 
            <div> {organizationName}</div> 
            <div>{location}</div>
        </>
    )
}