import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";
import { Backdrop } from "@material-ui/core";
import './style.css';
const SellRequests = () => {
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:8000/userPosts";
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
    // const fun = async () => {
    //   setPosts((await axios.get(BACKEND_URL)).data.posts);
    // };
    // fun();
  }, []);
  // const [userid, setUserid] = useState("");
  // if (localStorage["college_trader_data"]) {
  //   setUserid(JSON.parse(localStorage["college_trader_data"])._id);
  // }
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const fun = async () => {
  //     setPosts(await axios.get(BACKEND_URL, { id: userid }));
  //   };
  //   fun();
  // }, []);
  // console.log(posts);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fun = async () => {
      console.log(JSON.parse(localStorage["college_trader_data"])._id);
      setPosts(
        await axios.post(BACKEND_URL, {
          id: JSON.parse(localStorage["college_trader_data"])
            ? JSON.parse(localStorage["college_trader_data"])._id
            : "",
        })
      );
      console.log(
        await axios.post(BACKEND_URL, {
          id: JSON.parse(localStorage["college_trader_data"])
            ? JSON.parse(localStorage["college_trader_data"])._id
            : "",
        })
      );
    };
    fun();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container-fluid py-2" id="MarketCardDeck">
          <div className="row g-3">
      {posts?.data?.posts.map((item, i) => (
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
      </div>
    </div>
  );
};

export default SellRequests;
