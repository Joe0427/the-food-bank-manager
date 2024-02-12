import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to diaplay on their profile
import { useAddFoodBank } from "../../hooks/useAddFoodBank"; //use this file to add food banks
import { useGetFoodBanks } from "../../hooks/useGetFoodBanks"; //use this file to read food banks
import React, { useState } from "react";

export const Profile = () => {
    const { name, role } = useGetUserInfo()
    const { addFoodBank } = useAddFoodBank() //get the addFoodBank function from useAddFoodBank returned functions to later write needed data into it
    const { foodBanks } = useGetFoodBanks() //foodBanks is an array of all foodBanks, and we can use map in html below to loop through all foodbanks and show them

    const [bankName, setBankName] = useState(""); //read from and set/write data into html tag inputs
    const [location, setLocation] = useState("");

    const onSubmit = (e) => { 
        /*function called when form tag in hostabilities is submitted 
        - addFoodBank is the variable that contains data to return to useAddFoodBank file to commit to database*/
        e.preventDefault()
        addFoodBank({
            name: bankName, 
            location
        }) //values here come from useState functionality
    }

    //you will have different abilities depending on your role
    if (role === 'Host'){ 
        //host can create foodbanks and show foodbanks in their profile (will show them later)
        return (
            <>
                <div>
                    <div> {name}'s profile </div>
                    <h1>Host a Food Bank Now</h1>
                    <form onSubmit={onSubmit}>
                        <div>
                            <h3>Name of Food Bank</h3>
                            <input onChange={(e) => setBankName(e.target.value)}
                                type="text"
                                placeholder="name"
                                id="name"
                                required
                            />
                        </div>
    
                        <div>
                            <h3>Location of Food Bank</h3>
                            <input onChange={(e) => setLocation(e.target.value)}
                                type="text"
                                placeholder="location"
                                id="location"
                                required
                            />
                        </div>
                        <br></br>
                        <button type="submit">
                            Add Food Bank
                        </button>
                    </form>
                </div>
                
                <div className="foodBanks">
                    <h3> Food Banks You are Hosting</h3>
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
            </>
        )
    }

    else if(role === 'Donater'){
        return (
            <div>
                <div> {name}'s profile </div>
                <h5>donater to be implemented</h5>
            </div>
        )
    }
    else{
        return (
            <div>
                <div> {name}'s profile </div>
                <h5>receiver to be implemented</h5>
            </div>
        )
    }
   
}