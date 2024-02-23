import { useGetUserInfo } from "../../hooks/useGetUserInfo"; //need user info to display on their profile
import { useAddFoodBank } from "../../hooks/useAddFoodBank"; //use this file to add food banks
import React, { useState } from "react";

export const AddFoodBank = () => {
    const { name, role } = useGetUserInfo()
    const { addFoodBank } = useAddFoodBank()

    const [bankName, setBankName] = useState(""); //read from and set/write data into html tag inputs
    const [location, setLocation] = useState("");

    const [foodName, setFoodName] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [foodAllowed, setFoodAllowed] = useState([]);
    
    const onSubmit = (e) => { 
        /*function called when form tag in hostabilities is submitted 
        - addFoodBank is the variable that contains data to return to useAddFoodBank file to commit to database*/
        e.preventDefault()
        addFoodBank({
            name: bankName, 
            location,
            foodAllowed
        }) //values here come from useState functionality
    }

    return (
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
                <div>
                    <h3>Food Allowed</h3>
                    <input
                        type="text"
                        placeholder="Enter new category"
                        onChange={e => setCategory(e.target.value)}
                    />
                    <button type="button" onClick={() => {
                        setCategories([
                        ...categories,
                        { name: category }
                        ]);
                    }}>Add Category</button>

                    <div>
                        {categories.map(c => (
                        <>
                            <h4>{c.name}</h4>
                            <input
                            type="text"
                            placeholder="Enter food you want allowed"
                            onChange={e => setFoodName(e.target.value)}
                            />
                            <button type="button" onClick={() => {
                                setFoodAllowed([
                                ...foodAllowed,
                                { 
                                    name: foodName,
                                    category: c.name}
                                ]);
                            }}>Add Food Item</button>

                            <div>
                                {foodAllowed.map(food => {
                                    if (food.category === c.name) {
                                    return (
                                        <>
                                        <li>{food.category}</li>
                                        <li>{food.name}</li><hr></hr>
                                        </>
                                    );
                                    }

                                    return <></>;
                                })}
                            </div>
                        </>
                        ))}
                    </div>

                </div>
                
                <br></br>

                <button type="submit">
                    Add Food Bank
                </button>
            </form>
        </div>
    )
}