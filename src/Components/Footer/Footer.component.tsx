import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./Footer.styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="sticky-footer">
      <span>
        Made With Love
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: "red", marginLeft: 10 }}
        />
      </span>
    </footer>
  );
};

export default Footer;
