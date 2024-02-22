import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Auth } from './pages/auth/index'
import { Profile } from "./pages/profile";
import { FoodBanksList } from "./pages/foodBanks/foodBanksList";
import { AddFoodBank } from "./pages/foodBanks/addFoodBank";
import { AddDonation } from "./pages/donater/addDonation";
import { GetDonations } from "./pages/donater/getDonations";

function App() {
  return (
    //this is where you put routes for all pages
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/food-banks-list" element={<FoodBanksList />} />
          <Route path="/add-food-bank" element={<AddFoodBank />} />
          <Route path="/add-donation" element={<AddDonation />} />
          <Route path="/get-my-donations" element={<GetDonations />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
