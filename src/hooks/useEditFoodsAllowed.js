import React from "react";

const EditFoodPopup = ({ bankName, location, foodAllowed, setBankName, setLocation, setFoodAllowed, onSubmit, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Edit Foods Allowed</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="bankName">Name of Food Bank:</label>
                        <input
                            id="bankName"
                            type="text"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location of Food Bank:</label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="foodAllowed">Food Allowed (comma-separated):</label>
                        <input
                            id="foodAllowed"
                            type="text"
                            value={foodAllowed}
                            onChange={(e) => setFoodAllowed(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditFoodPopup;
