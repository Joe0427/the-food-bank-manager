import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth"; //authentication abilities
import React, { useRef,useState,useEffect } from "react"; //get info from html inputs
import { useNavigate } from "react-router-dom"; //to navigate to other pages

export const Auth = () => {
    const navigate = useNavigate()

    const [role, setRole] = useState("Select Role");

    const [hostVisible, setHostVisible] = useState(false);
    const [receiverVisible, setReceiverVisible] = useState(false);
    const [donaterVisible, setDonaterVisible] = useState(false);

    const [organizationName, setOrganizationName] = useState("");
    const [location, setLocation] = useState("");
    const organizationTypeRef = useRef()

    useEffect(() => {
        role === "Donater" ? setDonaterVisible(true): setDonaterVisible(false);
        role === "Receiver" ? setReceiverVisible(true) : setReceiverVisible(false);
        role === "Host" ? setHostVisible(true) : setHostVisible(false);
      }, [role]);

    const handleOnSelect = (e) => {
        setRole(e.target.value);
    };

    //authenticating user and storing user in local storage with related info about them
    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth,provider)
        if(role === "Donater"){
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            role: role,
            organizationName,
            location,
            organizationType:organizationTypeRef.current.value,
            profilePhoto: results.user.photoURL,
            isAuth: true,
          };
          localStorage.setItem("auth", JSON.stringify(authInfo));}
          else if (role === "Host"){
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                role: role,
                profilePhoto: results.user.photoURL,
                isAuth: true,
              };
            localStorage.setItem("auth", JSON.stringify(authInfo));
          }
          navigate('/profile')
    }
    
    return (
        <div>
            <h3>Sign Up</h3>

            <label>
                Pick a Role:
            </label>
            <select name="selectedRole" default="Select Role" onChange={handleOnSelect}>
                <option value="Donater">Donater</option>
                <option value="Receiver">Receiver</option>
                <option value="Host">Host</option>
            </select><br></br><br></br>

            {hostVisible === true ? (
                <div>Host</div>
            ): (
                <></>
            )}

            {donaterVisible === true ? (
                <>
                    <div>
                    <h3> Organization Name </h3>
                    <input onChange={(e) => setOrganizationName(e.target.value)}
                        type="text"
                        placeholder="name of Organization (if single, put your name)"
                        id="name"
                        required
                    />
                    </div>

                    <div>
                        <h3> Location </h3>
                        <input onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="location of Organization (if single, put your home)"
                            id="location"
                            required
                        />
                    </div>
                    <br></br>
                    <label>
                        Organization Type:
                        <select name="organizationType" defaultValue="Single" ref={organizationTypeRef}>
                            <option value="Single">Single</option>
                            <option value="GroceryStore">Grocery Store</option>
                            <option value="Restaurant">Restaurant</option>
                        </select>
                    </label><br></br><br></br>
                </>
            ): (
                <></>
            )}

            {receiverVisible === true ? (
                <div>Receiver</div>
            ): (
                <></>
            )}

            <button onClick={signInWithGoogle}> Sign Up With Google </button>
        </div>
    )
}