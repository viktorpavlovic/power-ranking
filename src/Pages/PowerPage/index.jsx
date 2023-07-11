import { React, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import SelectingTeams from "../../Components/SelectingTeams";
import "./power-page.scss";

const PowerPage = ({uid}) => {
  const [allTeams, setAllTeams] = useState([]);
  const [allUsers,setAllUsers] = useState([])

  useEffect(() => {
    const fetchAllTeams = async () => {
      const collectionRef = collection(db, "teams");
      const querySnapshot = await getDocs(collectionRef);
      const teamsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllTeams(teamsData[0]?.data?.TeamNames);
    };
    fetchAllTeams();
  }, []);
  useEffect(() => {
    const fetchAllUsers = async () => {
      const collectionRef = collection(db, "users");
      const querySnapshot = await getDocs(collectionRef);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setAllUsers(usersData);
    };
    fetchAllUsers();
  }, []);
  
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
