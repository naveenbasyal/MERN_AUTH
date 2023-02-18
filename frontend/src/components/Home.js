import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  return (
    <div className="container my-4">
      <h1>Welcome {location.state.id} to the Home Page</h1>
    </div>
  );
};

export default Home;
