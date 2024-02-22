import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState(""); // State to store the selected role

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value); // Update selected role when the user selects a role
    };

    const signInWithGoogle = async () => {
        if (!selectedRole) {
            alert("Please select a role"); // Notify the user if no role is selected
            return;
        }

        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                role: selectedRole, // Use the selected role
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate('/profile');
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <div>
            <h3>Sign Up</h3>

            <label>
                Pick a Role:
            </label>
            <select name="selectedRole" value={selectedRole} onChange={handleRoleChange}>
                <option value="">Select Role</option>
                <option value="Donater">Donater</option>
                <option value="Receiver">Receiver</option>
                <option value="Host">Host</option>
            </select><br /><br />

            <button onClick={signInWithGoogle}>Sign Up With Google</button>
        </div>
    );
};
