import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Users from "./components/Users";
import Bookings from "./components/Booking";
import Events from "./components/boardings";
import University from "./components/University";
import Boardings from "./components/boardings";
import Room from "./components/Rooms";
import AddUniversity from "./components/adduniversity";
import "./App.css";
import AddBoarding from "./components/addboarding";
import AddRoom from "./components/addroom";

const App: React.FC = () => {
  return (
    <Router>
      
        <Sidebar />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/events" element={<Events />} />
            <Route path="/Universities" element={<University />} />
            <Route path="/Boardings" element={<Boardings />} />
            <Route path="/rooms" element={<Room/>} />
            <Route path="/adduniversity" element={<AddUniversity />} />
            <Route path="/addboarding" element={<AddBoarding />} />
            <Route path="/addroom" element={<AddRoom />} />
          </Routes>
      
    </Router>
  );
};

export default App;
