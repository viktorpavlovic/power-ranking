import React from "react";
import infinity from "../../Assets/infinity.png"
import "./footer.scss";

const Footer = () => {
  return <div className="div-footer">
    <h4>Kreirao lik sa kraja univerzuma</h4>
    <img src={infinity} alt="infinity" />
  </div>;
};

export default Footer;
