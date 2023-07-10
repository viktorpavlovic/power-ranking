import React, { useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useForm } from "react-hook-form";
import "./selecting-teams.scss"

const SelectingTeams = ({ allTeams }) => {
  let getUid = localStorage.getItem("uid");
  let uid = getUid.slice(1, -1);
  const { handleSubmit, setValue, watch } = useForm();
  const userDocRef = doc(db, "users", uid);
  const availableTeams = allTeams.filter((team) => {
    const selectedTeams = watch();
    return !Object.values(selectedTeams).includes(team);
  });

  useEffect(() => {
    const selectedTeams = watch();
    const ranking = Object.values(selectedTeams).filter(
      (value) => value !== ""
    );
    console.log(ranking);
  }, [watch]);

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
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("Error adding teams:", error);
    }
  };

  const handleChange = (index, value) => {
    setValue(`team-${index}`, value);
  };

  return (
    <div className="div-selecting-teams">
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
        <button>Power renkuj </button>
      </form>
    </div>
  );
};

export default SelectingTeams;
