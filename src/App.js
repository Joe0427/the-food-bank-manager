import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Auth } from './pages/auth/signUp'
import { Profile } from "./pages/profile/index";

function App() {
  return (
    //this is where you put routes for all pages
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
