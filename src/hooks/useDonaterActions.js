import React from "react";
import { Link } from "react-router-dom"; // Import Link component to navigate to donation page

const DonaterActions = ({ foodBanks }) => {
  return (
    <div>
      <h1>Available Food Banks</h1>
      <ul>
        {foodBanks.map((foodBank) => (
          <li key={foodBank.id}>
            <div>Food Bank Name: {foodBank.name}</div>
            <div>Location: {foodBank.location}</div>
            {foodBank.foodAllowed && (
              <div>
                Food Allowed:
                <ul>
                  {foodBank.foodAllowed.map((allowedFood, index) => (
                    <li key={index}>{allowedFood}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Add a link to the donation page */}
            <Link to={`/donate/${foodBank.id}`}>Donate to this Food Bank</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonaterActions;
