import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const UserComponents = () => {
    const auth = localStorage.getItem('user');
    JSON.parse(auth);
    return auth ?<Outlet />:<Navigate to="/" />
}

export default UserComponents;