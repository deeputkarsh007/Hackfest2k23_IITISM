import React, { useEffect } from "react";
import UploadForm from "../../components/UploadForm";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

const UploadForRent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
      <UploadForm />
    </>
  );
};

export default UploadForRent;
