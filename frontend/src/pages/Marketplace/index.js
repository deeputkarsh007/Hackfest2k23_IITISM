import React, { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import Navbar from "../../components/Navbar";
import "./style.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Marketplace = () => {
  const BACKEND_URL = "http://localhost:8000/getAllPosts";
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
    const fun = async () => {
      setPosts((await axios.get(BACKEND_URL)).data.posts);
    };
    fun();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardList, setCardList] = useState([]);
  const [typeselected, setTypeSelected] = useState("Rent");
  return (
    <>
      <Navbar />
      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search"
      />
      <select
        value={typeselected}
        onChange={(e) => {
          setTypeSelected(e.target.value);
          // console.log(e.target.value);
        }}
      >
        <option>Rent</option>
        <option>Buy</option>
      </select>
      <div
        style={{ backgroundColor: "rgb(237, 255, 233)", margin: "25px 0px" }}
      >
        {" "}
        <div class="container-fluid py-2" id="MarketCardDeck">
          <div class="row g-5 d-flex flex-row flex-nowrap">
            {posts &&
              posts
                .filter((item) => {
                  return (
                    (item.type === "Rent" || item.type === "Sell") &&
                    item?.title?.includes(searchTerm) &&
                    (typeselected === "Rent"
                      ? item.type === "Rent"
                      : item.type === "Sell")
                  );
                })
                .map((item, index) => (
                  <ItemCard
                    type={item.type}
                    key={index}
                    _id={item._id}
                    imgUrl={item.img_url}
                    item={item.title}
                    price={item.amount}
                    startDate={item.startingDate}
                    endDate={item.endingDate}
                    val={item.title}
                    postedBy={item.postedBy}
                  />
                ))}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Marketplace;
