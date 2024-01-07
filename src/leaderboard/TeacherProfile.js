import React from "react";
import "./style/teacherLeaderboard.css";

export default function TeacherProfile({ Leaderboard }) {
  return <div id="profile">{Item(Leaderboard)}</div>;
}

function Item(data) {
  return (
    <>
      {data.map((value, index) => (
        <div className="flex" key={index}>
          <div className="item">
            <div className="itemRank">
              <span className="rank">{index + 1}</span>
            </div>
            <div className="info">
              <h3 className="name text-dark">{value.name}</h3>
            </div>
          </div>
          <div className="itemScore">
            <h6 className="score">{Math.round(value.grade)}</h6>
          </div>
        </div>
      ))}
    </>
  );
}
