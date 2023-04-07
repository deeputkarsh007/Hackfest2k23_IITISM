import React, { useEffect } from "react";
import "./styles.css";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Home;
