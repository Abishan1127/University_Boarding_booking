import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const handleSignOut = () => {
    // Clear any tokens 
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">Admin Panel</h2>
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Users</Link>
          </li>
          <li className={location.pathname === "/bookings" ? "active" : ""}>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li className={location.pathname === "/universities" ? "active" : ""}>
            <Link to="/universities">Universities</Link>
          </li>
          <li className={location.pathname === "/boardings" ? "active" : ""}>
            <Link to="/boardings">Boardings</Link>
          </li >
          <li className="{location.pathname === '/rooms' ? 'active' : ''}">
            <Link to="/rooms">Rooms</Link>
          </li>
          <li className="{location.pathname === '/reviews' ? 'active' : ''}">
            <Link to="/reviews">Reviews</Link>
          </li>
          {/* Sign Out button */}
          <li>
            <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;



{/* <li className={location.pathname === "/analytics" ? "active" : ""}>
            <Link to="/analytics">Analytics</Link>
          </li> */}