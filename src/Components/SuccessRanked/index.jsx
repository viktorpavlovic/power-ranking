import React from "react";
import "./success-ranked.scss";

const SuccessModal = ({ yourRanking }) => {
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="success-modal-div">
      <h1>Tvoj power ranking:</h1>
      {yourRanking.map((e, i) => {
        const teamName = e.toLowerCase().replace(/\s+/g, "-");

        return (
          <div className={`single-team team-${teamName}`} key={i}>
            <p>
              {i + 1}.{e}
            </p>
          </div>
        );
      })}
      <h3>
        Ako nisi zadovoljan ovim rankingom klikni na dugme ispod i odradi ga
        ispocetka
      </h3>
      <button onClick={handleClick} className="again-btn">
        Ponovi
      </button>
    </div>
  );
};

export default SuccessModal;
