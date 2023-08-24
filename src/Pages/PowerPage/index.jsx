import { React, useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SelectingTeams from "../../Components/SelectingTeams";
import "./power-page.scss";

const PowerPage = ({ uid }) => {
  const [allTeams, setAllTeams] = useState([]);
  const [allUsersTeams, setAllUsersTeams] = useState([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      const collectionRef = collection(db, "teams");
      const querySnapshot = await getDocs(collectionRef);
      const teamsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllTeams(teamsData[0]?.data?.allTeams);
    };
    fetchAllTeams();
  }, []);

  const fetchAllUsers = async () => {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(collectionRef);
    const usersData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    const userTeams = {};

    for (const user of usersData) {
      const userName = user.data.userName;
      // const userRef = doc(db, "users", user.id);
      // const userDoc = await getDoc(userRef);
      // const userData = userDoc.data();
      const userTeamsArray = user.data.teams || [];
      userTeams[userName] = userTeamsArray;
    }

    // console.log(userTeams);

    setAllUsersTeams(userTeams);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const calculateTeamPoints = () => {
    const teamPoints = {};

    for (const user in allUsersTeams) {
      const teams = allUsersTeams[user];
      // console.log(user, allUsersTeams);

      teams.forEach((team, index) => {
        const points = teams.length - index;

        if (teamPoints.hasOwnProperty(team)) {
          teamPoints[team] += points;
        } else {
          teamPoints[team] = points;
        }
      });
      debugger;
    }

    return teamPoints;
  };

  const teamPoints = calculateTeamPoints();
  const sortedTeamPoints = Object.entries(teamPoints)
    .sort((a, b) => b[1] - a[1])
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  console.log(sortedTeamPoints);

  return (
    <div className="div-power-page">
      <Header />
      <div className="wrapper-power-div">
        <SelectingTeams allTeams={allTeams} uid={uid} />
      </div>
      <Footer />
    </div>
  );
};

export default PowerPage;
