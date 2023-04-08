import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";

const GetRequests = () => {
  const BACKEND_URL = "http://localhost:8000/userPosts";
  const userid = JSON.parse(localStorage["college_trader_data"])._id;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fun = async () => {
      setPosts(await axios.post(BACKEND_URL, { id: userid }));
    };
    fun();
  }, []);
  console.log(posts);
  return (
    <div>
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
        />
      ))}
    </div>
  );
};

export default GetRequests;
