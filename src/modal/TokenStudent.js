import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenStudent = () => {
  const auth = localStorage.getItem("user");
  const [tokenClass, setToken] = useState("");

  const submit = async () => {
    let result = await fetch("http://localhost:8080/student/inputtoken/submit", {
      method: "post",
      body: JSON.stringify({ token: tokenClass, id: JSON.parse(auth)._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response;
      });

    if (result.notes) {
      alert("Berhasil masuk kelas, silahkan login ulang!");
      localStorage.removeItem("user");
      return nav("/");
    } else {
      alert("token salah");
    }
  };

  const logout = () => {
    console.log(JSON.parse(localStorage.getItem("user")).class);
    localStorage.removeItem("user");
    return nav("/");
  };

  const nav = useNavigate();
  useEffect(() => {
    if (JSON.parse(auth).class != null) {
      return nav("/student/class/");
    }
  });

  return (
    <form className="container mt-5">
      <h1 className="judul">Input Token</h1>
      <hr></hr>

      <div className="mb-3">
        <label>Enter the token that was given by your teacher</label>
        <input type="text" className="form-control" value={tokenClass} onChange={(e) => setToken(e.target.value)} placeholder="Enter Token" />
      </div>

      <div className="">
        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>

        <button type="submit" className="btn btn-danger ms-3" onClick={logout}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TokenStudent;
