import React, { useState } from "react";
import { ReactComponent as Logo } from "../../Assets/Logo/vr-cardboard-solid.svg";
import { Link } from "react-router-dom";

import "./Navigation.styles.css";

const Navigation: React.FC = (Props) => {
  const [showNav, setShowNav] = useState(true);
  return (
    <nav className="navbar">
      <Link className="logo-container" to="/Landing">
        <Logo className="logo" />
      </Link>
      <span className="logo-text">Teacher's Lens</span>
      <div className="options">
        {showNav ? (
          <React.Fragment>
            {/* <Link
              className="option"
              to={
                CurrentPath.location.pathname === "/Join-Us" ? "/" : "/Join-Us"
              }
            >
              {CurrentPath.location.pathname === "/Join-Us"
                ? "LOGIN"
                : "SIGNUP"}
            </Link> */}
            <Link className="option" to="#">
              CONTACT
            </Link>
            <Link className="option" to="#">
              ABOUT
            </Link>
            <Link className="option" to="#">
              TEACHER'S BLOG
            </Link>
          </React.Fragment>
        ) : null}

        {/* <ThreeLineHorizontal
          size={24}
          onClick={() => setShowNav(!showNav)}
          style={{ transition: "all ease 600ms" }}
        /> */}
      </div>
    </nav>
  );
};

export default Navigation;
