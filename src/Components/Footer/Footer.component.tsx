import { Heart } from "akar-icons";
import React from "react";

import "./Footer.styles.css";

const Footer: React.FC = () => {
  return (
    <footer className="sticky-footer">
      <span>
        Made With Love
        <Heart
          size={15}
          style={{ color: "red", marginLeft: 10, fill: "red" }}
        />
      </span>
    </footer>
  );
};

export default Footer;
