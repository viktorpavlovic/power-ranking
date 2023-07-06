import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import AnonymusAuth from "../../Components/AnonymousAuth";
import "./landing-page.scss";

const LandingPage = ({ setAccessToken }) => {
  return (
    <div className="div-landing-page">
      <Header />
      <div className="div-wrapper-landing">
        <AnonymusAuth setAccessToken={setAccessToken} />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
