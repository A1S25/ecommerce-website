import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router-dom";
import Loader from "../layout/loader page/loader";

const ProtectedRoute = ({ isTeam, isAdmin, element: Element, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (loading) {
    return <div><Loader /></div>;
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (isAdmin && user.user.role !== "admin") {
    navigate("/login");
    return null;
  }

  if (isTeam && user.user.email !== "abc123@gmail.com") {
    navigate("/login");
    return null;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;