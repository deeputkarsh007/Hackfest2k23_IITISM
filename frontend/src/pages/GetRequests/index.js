import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import ItemCard from "../../components/ItemCard";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
const GetRequests = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
    // const fun = async () => {
    //   setPosts((await axios.get(BACKEND_URL)).data.posts);
    // };
    // fun();
  }, []);
  const [appr, setAppr] = useState([]);
  //   const [dec, setDec] = useState([]);
  const BACKEND_ACC_URL = "http://localhost:8000/getreqby";
  useEffect(() => {
    const fun = async () => {
      setAppr(
        (
          await axios.post(BACKEND_ACC_URL, {
            id: JSON.parse(localStorage["college_trader_data"])._id,
          })
        ).data.resp
      );

      //   console.log(
      //     await axios.post(BACKEND_ACC_URL, {
      //       id: JSON.parse(localStorage["college_trader_data"])._id,
      //     })
      //   );
    };
    fun();
  }, []);
  return (
    <div>
      <Navbar />
      {appr.map((item, i) => (
        <ItemCard
          key={i}
          value={i}
          imgUrl={item.img_url}
          item={item.title}
          price={item.amount}
          startDate={item.startingDate}
          endDate={item.endingDate}
          type={item.type}
          postedBy={item.postedBy}
          _id={item._id}
        />
      ))}
    </div>
  );
};

export default GetRequests;
