import React from "react";
import { useNavigate } from "react-router-dom";
import { logout, getTokenEmail} from "../utils/auth";
import { FaUserCircle } from "react-icons/fa";
import '../styles/Navbar.css';


export default function Navbar() {
  const navigate = useNavigate();
  const email = getTokenEmail();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h3>Dashboard</h3>
      <div className="navbar-right">
        <FaUserCircle className="profile-icon" />
        <span className="user-email">{email}</span>
        <button onClick={handleLogout}>Sign out</button>
      </div>
    </nav>
  );
}
