import React, { useEffect, useState } from "react";
import Profiles from "./profiles";
import "./leaderboard.css";
import SidebarStudent from "../sidebarStudent/sidebarStudent";

export default function StudentBoard() {
  const [period, setPeriod] = useState(0);
  const [Leaderboards, setLeaderboards] = useState([]);

  let Leaderboard = Leaderboards;

  const handleClick = (e) => {
    setPeriod(e.target.dataset.id);
  };

  useEffect(() => {
    const filterData = async (e) => {
      let result = await fetch("http://localhost:8080/student/leaderboard", {
        method: "post",
        body: JSON.stringify({ keyClass: JSON.parse(localStorage.getItem("user")).class }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          return response.data;
        })
        .then((response) => {
          console.log(response);
          setLeaderboards(response);
          return response;
        });
    };
    filterData();
  }, []);

  console.log(JSON.parse(localStorage.getItem("user")).class);

  return (
    <div>
      <SidebarStudent />
      <div className="container board">
        <h1 className="judul mt-5">Leaderboard</h1>
        <hr></hr>
        <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
      </div>
    </div>
  );
}

function between(data) {
  let filter = data.filter((item) => {
    return data;
  });

  return filter.sort((a, b) => {
    if (a.grade === b.grade) {
      return b.grade - a.grade;
    } else {
      return b.grade - a.grade;
    }
  });
}
