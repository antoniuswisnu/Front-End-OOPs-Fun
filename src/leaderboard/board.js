import React, { useState, useEffect } from "react";
import Profiles from "./profiles";
import Sidebar from "../sidebar/sidebar";
import "./style/leaderboard.css";

export default function Board() {
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
        body: JSON.stringify({ keyClass: JSON.parse(localStorage.getItem("key")).key }),
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
      <Sidebar />
      <div className="board">
        <h1 className="judul mt-5">Leaderboard</h1>
        <hr className="garis-kelas"></hr>
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
