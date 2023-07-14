import React from "react";
import "./success-ranked.scss";

const SuccessModal = ({ yourRanking }) => {
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="success-modal-div">
      <h1>Tvoj power ranking</h1>
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
      <h4>
        Napomena, ukoliko ponovo power renkuješ ovaj ranking će biti obrisan i moraćeš da koristiš drugo ime
      </h4>
      <button onClick={handleClick} className="again-btn">
        Ponovi power ranking
      </button>
    </div>
  );
};

export default SuccessModal;
