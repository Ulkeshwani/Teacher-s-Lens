import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/Logo/vr-cardboard-solid.svg";
import {} from "";
import { Link } from "react-router-dom";

import "./Navigation.styles.css";

const Navigation: React.FC = (Props) => {
  const CurrentPath = useHistory();
  return (
    <nav className="navbar">
      <Link className="logo-container" to="/Landing">
        <Logo className="logo" />
      </Link>
      <span className="logo-text">Teacher's Lens</span>
      <div className="options">
        <Link
          className="option"
          to={CurrentPath.location.pathname === "/Join-Us" ? "/" : "/Join-Us"}
        >
          {CurrentPath.location.pathname === "/Join-Us" ? "LOGIN" : "SIGNUP"}
        </Link>
        <Link className="option" to="#">
          CONTACT
        </Link>
        <Link className="option" to="#">
          ABOUT
        </Link>
        <Link className="option" to="#">
          TEACHER'S BLOG
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
