import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/login" className="nav-link active" aria-current="page">
                Login
              </Link>
            </li>
            <li className="nav-item"></li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link active"
                aria-current="page"
              >
                Messages
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
