import React, { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import newEnglandLogo from "../../Assets/new-england.png";
import philaLogo from "../../Assets/philadelphia.gif";
import pittsburghLogo from "../../Assets/pittsburg.png";
import arizonaLogo from "../../Assets/arizona.png";
import atlantaLogo from "../../Assets/atlanta.png";
import baltimoreLogo from "../../Assets/baltimore.png";
import buffaloLogo from "../../Assets/buffalo.png";
import carolinaLogo from "../../Assets/carolina.png";
import chicagoLogo from "../../Assets/chicago.png";
import ramsLogo from "../../Assets/rams.png";
import bengalsLogo from "../../Assets/bengals.png";
import brownsLogo from "../../Assets/browns.png";
import cowboysLogo from "../../Assets/cowboys.png";
import denverLogo from "../../Assets/broncos.png";
import lionsLogo from "../../Assets/lions.png"
import packersLogo from "../../Assets/packers.png"
import texansLogo from "../../Assets/texans.png"
import coltsLogo from "../../Assets/colts.png"
import jaguarsLogo from "../../Assets/jaguars.png"
import kansasLogo from "../../Assets/kansas.png"
import raidersLogo from "../../Assets/raiders.png"
import chargersLogo from "../../Assets/chargers.png"
import miamiLogo from "../../Assets/miami.png"
import vikingsLogo from "../../Assets/vikings.png"
import saintsLogo from "../../Assets/saints.png"
import giantsLogo from "../../Assets/giants.png"
import jetsLogo from "../../Assets/jets.png"
import ninersLogo from "../../Assets/niners.png"
import seahawksLogo from "../../Assets/seahawks.png"
import tampaLogo from "../../Assets/tampa.png"
import titansLogo from "../../Assets/titans.png"
import washLogo from "../../Assets/wash.png"
import SuccessModal from "../SuccessRanked";
import "./selecting-teams.scss";

const SelectingTeams = ({ allTeams }) => {
  const teamLogos = {
    "New England Patriots": newEnglandLogo,
    "Philadelphia Eagles": philaLogo,
    "Pittsburgh Steelers": pittsburghLogo,
    "Arizona Cardinals": arizonaLogo,
    "Atlanta Falcons": atlantaLogo,
    "Baltimore Ravens": baltimoreLogo,
    "Buffalo Bills": buffaloLogo,
    "Carolina Panthers": carolinaLogo,
    "Chicago Bears": chicagoLogo,
    "Los Angeles Rams": ramsLogo,
    "Cincinnati Bengals": bengalsLogo,
    "Cleveland Browns": brownsLogo,
    "Dallas Cowboys": cowboysLogo,
    "Denver Broncos": denverLogo,
    "Detroit Lions": lionsLogo,
    "Green Bay Packers":packersLogo,
    "Houston Texans": texansLogo,
    "Indianapolis Colts":coltsLogo,
    "Jacksonville Jaguars":jaguarsLogo,
    "Kansas City Chiefs": kansasLogo,
    "Las Vegas Raiders":raidersLogo,
    "Los Angeles Chargers":chargersLogo,
    "Miami Dolphins": miamiLogo,
    "Minnesota Vikings": vikingsLogo,
    "New Orleans Saints": saintsLogo,
    "New York Giants":giantsLogo,
    "New York Jets": jetsLogo,
    "San Francisco 49ers": ninersLogo,
    "Seattle Seahawks":seahawksLogo,
    "Tampa Bay Buccaneers":tampaLogo,
    "Tennessee Titans":titansLogo,
    "Washington Commanders":washLogo

  };
  let getUid = localStorage.getItem("uid");
  let uid = getUid.slice(1, -1);
  const { handleSubmit, setValue, watch } = useForm();
  const [yourRanking, setYourRanking] = useState(
    JSON.parse(localStorage.getItem("yourRanking")) || []
  );
  const [submited, setSubmited] = useState(
    localStorage.getItem("submited") === "true"
  );
  const userDocRef = doc(db, "users", uid);
  const availableTeams = allTeams
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .filter((team) => {
      const selectedTeams = watch();
      return !Object.values(selectedTeams).includes(team);
    });
  const teamRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const teamsArray = [];
      for (let i = 0; i < 32; i++) {
        const team = data[`team-${i}`];
        if (team) {
          teamsArray.push(team);
        }
      }
      await updateDoc(userDocRef, {
        teams: teamsArray,
      });
      setYourRanking(teamsArray);
      setSubmited(true);
      localStorage.setItem("submited", "true");
      localStorage.setItem("yourRanking", JSON.stringify(teamsArray));
      teamRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error adding teams:", error);
    }
  };

  const handleChange = (index, value) => {
    setValue(`team-${index}`, value);
  };

  return (
    <div className="div-selecting-teams" ref={teamRef}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {allTeams.map((_, index) => (
          <div key={index} className="single-select-div">
            <p>Mesto {index + 1}</p>
            <figcaption>
              {watch(`team-${index}`) && teamLogos[watch(`team-${index}`)] && (
                <img
                  src={teamLogos[watch(`team-${index}`)]}
                  alt={watch(`team-${index}`)}
                  className="team-logo"
                />
              )}
            </figcaption>
            <select
              key={index}
              value={watch(`team-${index}`) || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            >
              <option value="">Izaberi tim</option>
              {watch(`team-${index}`) ? (
                <option value={watch(`team-${index}`)}>
                  {watch(`team-${index}`)}
                </option>
              ) : null}
              {availableTeams.map((team, i) => (
                <option key={i} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button>Power renkuj</button>
      </form>
      {submited && <SuccessModal yourRanking={yourRanking} />}
    </div>
  );
};

export default SelectingTeams;
