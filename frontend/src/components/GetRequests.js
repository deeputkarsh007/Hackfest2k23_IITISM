import axios from "axios";
import React, { useEffect, useState } from "react";

const GetRequests = async () => {
  const BACKEND_URL = "http://localhost:8000/userPosts";
  const userid = JSON.parse(localStorage["college_trader_data"])._id;
  //   const [posts, setPosts] = useState([]);
  //   useEffect(() => {
  //     const fun = async () => {
  //       setPosts(await axios.post(BACKEND_URL, { id: userid }));
  //     };
  //     fun();
  //   }, []);
  //   console.log(posts);
  return <div>hi</div>;
};

export default GetRequests;
