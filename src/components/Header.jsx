import React from "react";
import { Link } from "react-router-dom";

import { FaUserCircle, FaFutbol } from "react-icons/fa";

function Header({ user, logout }) {
  return (
    <>
      <div className="container-header">
        <div className="items-top">
          <div className="logo">
            <Link style={{ textDecoration: "none" }} to="/">
              <div className="ball-logo">
                <FaFutbol size="1em" color="white" />
              </div>
              <p>FootballLive</p>
            </Link>
          </div>
          {user ? (
            <div className="user">
              <FaUserCircle size="2em" /> <p onClick={logout}>Logout</p>
            </div>
          ) : (
            <div className="title-h">
              <Link style={{ textDecoration: "none" }} to="/signup">
                <p>Login</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
