import React, { useEffect } from "react";
import ItemCard from "../../components/ItemCard";
import Navbar from "../../components/Navbar";
import "./style.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";

const Marketplace = () => {
  const items = [
    {
      value: "4",
      imgUrl:
        "https://images.thrillophilia.com/image/upload/s--uwzVSWUD--/c_fill,h_775,q_auto,w_1600/f_auto,fl_strip_profile/v1/images/photos/000/173/853/original/1570794971_kochicycle3.png.jpg?1570794971",
      item: "Example Item 1",
      price: "$9.99",
      startDate: "2023-04-01",
      endDate: "2023-04-30",
    },
    {
      value: "4.5",
      imgUrl:
        "https://static.theprint.in/wp-content/uploads/2022/08/Kia_Sonet_India.png",
      item: "Example Item 2",
      price: "$19.99",
      startDate: "2023-04-01",
      endDate: "2023-04-30",
    },
    {
      value: "3",
      imgUrl:
        "https://images.thrillophilia.com/image/upload/s--iTGQRjjz--/c_fill,h_600,q_auto,w_975/f_auto,fl_strip_profile/v1/images/photos/000/087/866/original/1586257682_1465484411_DSC03948.JPG.webp.jpg?1586257682",
      item: "Example Item 3",
      price: "$29.99",
      startDate: "2023-04-01",
      endDate: "2023-04-30",
    },
    {
      value: "4",
      imgUrl:
        "'https://images.thrillophilia.com/image/upload/s--uwzVSWUD--/c_fill,h_775,q_auto,w_1600/f_auto,fl_strip_profile/v1/images/photos/000/173/853/original/1570794971_kochicycle3.png.jpg?1570794971'",
      item: "Example Item 4",
      price: "$39.99",
      startDate: "2023-04-01",
      endDate: "2023-04-30",
    },
    {
      value: "4",
      imgUrl:
        "https://images.thrillophilia.com/image/upload/s--uwzVSWUD--/c_fill,h_775,q_auto,w_1600/f_auto,fl_strip_profile/v1/images/photos/000/173/853/original/1570794971_kochicycle3.png.jpg?1570794971",
      item: "Example Item 5",
      price: "$49.99",
      startDate: "2023-04-01",
      endDate: "2023-04-30",
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
  }, []);
  const cardList = items.map((item, index) => (
    <ItemCard
      key={index}
      imgUrl={item.imgUrl}
      item={item.item}
      price={item.price}
      startDate={item.startDate}
      endDate={item.endDate}
      val={item.value}
    />
  ));

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundColor: "rgb(237, 255, 233)", margin: "25px 0px" }}
      >
        {" "}
        {/* CardDeck */}
        <div class="container-fluid py-2" id="MarketCardDeck">
          <div class="row g-5 d-flex flex-row flex-nowrap">{cardList}</div>
        </div>
      </div>{" "}
      {/* CardDeck */}
    </>
  );
};

export default Marketplace;
