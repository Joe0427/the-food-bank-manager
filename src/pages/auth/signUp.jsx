import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth"; //authentication abilities
import React, { useRef } from "react"; //get info from html inputs
import { useNavigate } from "react-router-dom"; //to navigate to other pages

export const Auth = () => {
    const navigate = useNavigate()
    const roleRef = useRef() //get role of user of website
    //authenticating user and storing user in local storage with related info about them
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth,provider)
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            role: roleRef.current.value,
            profilePhoto: results.user.photoURL,
            isAuth: true,
          };
          localStorage.setItem("auth", JSON.stringify(authInfo));
          navigate('/profile')
    }

    return (
        <div>
            <h3>Sign Up</h3>

            <label htmlFor={roleRef}>
                Pick a Role:
            </label>
            <select ref={roleRef} name="selectedRole">
                <option value="Donater">Donater</option>
                <option value="Receiver">Receiver</option>
                <option value="Host">Host</option>
            </select><br></br><br></br>

            <button onClick={signInWithGoogle}> Sign Up With Google </button>
        </div>
    )
}