// import "./style.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import React, { useEffect, useState } from "react";
// import ItemCard from "../../components/ItemCard";
// import Navbar from "../../components/Navbar";
// import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router";
// import axios from "axios";
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
  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardList, setCardList] = useState([]);
  const [typeselected, setTypeSelected] = useState("Rent");
  return (
    <>
      <Navbar />
      <div >
      <input style={{width:'75%', margin:'12px',borderRadius:'30px',padding:'10px 20px'} } className="MarketSearch"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search"
      />
      <select style={{width:'20%',height:'40px' ,borderRadius:'15px',padding:'0px 20px'}}
        value={typeselected}
        onChange={(e) => {
          setTypeSelected(e.target.value);
          // console.log(e.target.value);
        }}
      >
        <option>Rent</option>
        <option>Buy</option>
      </select>
      </div>
      <div
        style={{ margin: "25px 0px" }}
      >
        {" "}
        <div className="container-fluid py-2" id="MarketCardDeck">
          <div className="row g-3">
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
                    typeselected={typeselected}
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
