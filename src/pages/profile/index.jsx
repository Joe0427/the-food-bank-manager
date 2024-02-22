import React, { useState } from "react";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAddFoodBank } from "../../hooks/useAddFoodBank";
import { useGetFoodBanks } from "../../hooks/useGetFoodBanks";
import EditFoodPopup from "../../hooks/useEditFoodsAllowed";
import { signOut } from "firebase/auth"; // Import signOut function
import { auth } from "../../config/firebase-config"; // Import the authentication instance
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

export const Profile = () => {
    const navigate = useNavigate(); // Hook to navigate
    const { foodBanks, removeFoodBank, updateFoodBank } = useGetFoodBanks();
    const { userID, name, role } = useGetUserInfo();
    const { addFoodBank } = useAddFoodBank();

    const [bankName, setBankName] = useState("");
    const [location, setLocation] = useState("");
    const [foodAllowed, setFoodAllowed] = useState("");
    const [selectedFoodBank, setSelectedFoodBank] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);

    const hostedFoodBanks = foodBanks.filter(foodBank => foodBank.userID === userID);

    const handleRemoveFoodBank = (foodBankId) => {
        removeFoodBank(foodBankId);
    };

    const handleEditFoodAllowed = (foodBank) => {
        setSelectedFoodBank(foodBank);
        setBankName(foodBank.name);
        setLocation(foodBank.location);
        setFoodAllowed(foodBank.foodAllowed.join(", "));
        setShowEditPopup(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (selectedFoodBank) {
                // If a food bank is selected, update it
                await updateFoodBank(selectedFoodBank.id, {
                    name: bankName,
                    location,
                    foodAllowed: foodAllowed.split(",").map(item => item.trim()), // Convert string to array
                });
                console.log("Food bank updated successfully:", selectedFoodBank.id);
            } else {
                // Otherwise, add a new food bank
                await addFoodBank({
                    name: bankName,
                    location,
                    foodAllowed: foodAllowed.split(",").map(item => item.trim()), // Convert string to array
                });
                console.log("Food bank added successfully");
            }

            // Reset form fields and selected food bank
            setBankName("");
            setLocation("");
            setFoodAllowed("");
            setSelectedFoodBank(null);
            setShowEditPopup(false);
        } catch (error) {
            console.error("Error adding/updating food bank:", error);
        }
    };

    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("auth"); // Remove user data from local storage
            navigate('/'); // Redirect to the sign-in page
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <>
            <div>{name}'s profile</div>
            <div>You are a {role}</div>
            <button onClick={handleSignOut}>Sign Out</button>

            {/* Display food banks for donaters */}
            {role === "Donater" && (
                <div>
                    <h1>Available Food Banks</h1>
                    <ul>
                        {foodBanks.map(foodBank => (
                            <li key={foodBank.id}>
                                <div>Food Bank Name: {foodBank.name}</div>
                                <div>Location: {foodBank.location}</div>
                                {foodBank.foodAllowed && (
                                    <div>
                                        Food Allowed:
                                        <ul>
                                            {foodBank.foodAllowed.map((allowedFood, index) => (
                                                <li key={index}>
                                                    {allowedFood}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display food banks for donaters */}
            {role === "Receiver" && (
                <div>
                    <h1>Available Food Banks</h1>
                    <ul>
                        {foodBanks.map(foodBank => (
                            <li key={foodBank.id}>
                                <div>Food Bank Name: {foodBank.name}</div>
                                <div>Location: {foodBank.location}</div>
                                {foodBank.foodAllowed && (
                                    <div>
                                        Food Allowed:
                                        <ul>
                                            {foodBank.foodAllowed.map((allowedFood, index) => (
                                                <li key={index}>
                                                    {allowedFood}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {role === "Host" && (
                <div>
                    <h1>Host a Food Bank Now</h1>
                    <form onSubmit={onSubmit}>
                        <div>
                            <h3>Name of Food Bank</h3>
                            <input
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                                type="text"
                                placeholder="name"
                                id="name"
                                required
                            />
                        </div>

                        <div>
                            <h3>Location of Food Bank</h3>
                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                type="text"
                                placeholder="location"
                                id="location"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <h3>Food Allowed</h3>
                            <input
                                value={foodAllowed}
                                onChange={(e) => setFoodAllowed(e.target.value)}
                                type="text"
                                placeholder="Food allowed"
                                required
                            />
                        </div>
                        
                        <br />
                        <button type="submit">Add Food Bank</button>
                    </form>
                </div>
            )}

            {/* For Donater */}
            {role === "Donater" && (
                <div>
                    {/* Add Donater related content */}
                </div>
            )}

            {/* For Receiver */}
            {role === "Receiver" && (
                <div>
                    {/* Add Receiver related content */}
                </div>
            )}

            {role === "Host" && hostedFoodBanks.length > 0 && (
                <div>
                    <h2>Food Banks You Are Hosting</h2>
                    <ul>
                        {hostedFoodBanks.map(foodBank => (
                            <li key={foodBank.id}>
                                <div>Food Bank Name: {foodBank.name}</div>
                                <div>Location: {foodBank.location}</div>
                                {foodBank.foodAllowed && (
                                    <div>
                                        Food Allowed:
                                        <ul>
                                            {foodBank.foodAllowed.map((allowedFood, index) => (
                                                <li key={index}>
                                                    {allowedFood}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <button onClick={() => handleRemoveFoodBank(foodBank.id)}>Remove</button>
                                <button onClick={() => handleEditFoodAllowed(foodBank)}>Edit Food Bank</button>
                            </li>
                        ))}
                    </ul>
                    {showEditPopup && (
                        <EditFoodPopup
                            bankName={bankName}
                            location={location}
                            foodAllowed={foodAllowed}
                            setBankName={setBankName}
                            setLocation={setLocation}
                            setFoodAllowed={setFoodAllowed}
                            onSubmit={onSubmit}
                            onClose={() => setShowEditPopup(false)}
                        />
                    )}
                </div>
            )}
        </>
    );
};
