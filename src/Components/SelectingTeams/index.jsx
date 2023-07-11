import React, { useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import SuccessModal from "../SuccessRanked";
import "./selecting-teams.scss";

const SelectingTeams = ({ allTeams }) => {
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
  const availableTeams = allTeams.filter((team) => {
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
