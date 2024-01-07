import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const TeacherComponents = () => {
    const auth = localStorage.getItem('user');
    let auth2 = JSON.parse(auth);
    return auth2.roles === "teacher" ?<Outlet />:<Navigate to="/student/inputtoken" />
}

export default TeacherComponents;