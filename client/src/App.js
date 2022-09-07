import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashBoard from "./components/Dashboard";
import Login from "./components/Login";
import Spinner from "./components/Spinner";

function App() {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Login />;
  }

  return <DashBoard />;
}

export default App;
