import './App.css'
import React, { useState } from 'react';
import Donate from './components/donate/Donate';
import Foodbank from './components/foodbank/Foodbank';
import Recieve from './components/recieve/Recieve';
import Sidebar from './components/sidebar/Sidebar';
import UserProfile from './components/userprofile/UserProfile';
import Welcome from './components/welcome/Welcome';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Auth } from './pages/auth/index'
import { Profile } from "./pages/profile/index";
import { FoodBanksList } from "./pages/foodBanks/foodBanksList";
import { AddFoodBank } from "./pages/foodBanks/addFoodBank";
import { AddDonation } from "./pages/donater/addDonation";
import { GetDonations } from "./pages/donater/getDonations";




function App() {
  const [activeComponent, setActiveComponent] = useState();

  const renderComponent = () => {
    switch (activeComponent) {
      case '1':
        return <Welcome/>;
      case '2':
        /*if (role == donater) {  detect if user is a donater   */ 
        return <Donate/>;
        
      case '3':
        /*if (role == recieve) {   detect if user is a reciever*/
        return <Recieve/>;
      case '4':
        return <Foodbank/>;
      case '5':
        return <UserProfile/>;
      default:
        return null;
    }
  };

  const handleSidebarButtonClick = (component) => {
    setActiveComponent(component);
  };

  /*role*/


  return (
    <div className="App">
        <div className='AppGlass'>
          <Sidebar onButtonClick={handleSidebarButtonClick} />
          {/* Components:
          <Welcome/>
          <Donate/>
          <Recieve/>
          <Foodbank/>
          <UserProfile/>
          */}
          
          {renderComponent()}

          <div className="Routes">
            {/*this is where you put routes for all pages*/}
              <Router>
                <Routes>
                  <Route path="/" exact element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/food-banks-list" element={<FoodBanksList />} />
                  <Route path="/add-food-bank" element={<AddFoodBank />} />
                  <Route path="/add-donation/:foodBankID" element={<AddDonation />} />
                  <Route path="/get-my-donations" element={<GetDonations />} />

                </Routes>
              </Router>
            </div>
          
        </div> 

          
    
        
    </div>
  );
}

export default App;
