import React from "react";
import logoBall from "../../Assets/american-football-svgrepo-com.svg";
import "./header.scss";

const Header = () => {
  return (
    <div className="div-header">
      <nav>
        <img src={logoBall} alt="Ball" />
        <h3>Power Ranking 99 Jardi</h3>
        <img src={logoBall} alt="Bal" />
      </nav>
    </div>
  );
};

export default Header;
