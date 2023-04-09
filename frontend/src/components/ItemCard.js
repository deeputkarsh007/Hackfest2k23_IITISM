import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./ItemCard.css";
import axios from "axios";
const ItemCard = ({
  value,
  imgUrl,
  _id,
  item,
  price,
  startDate,
  endDate,
  type,
  postedBy,
  typeselected,
}) => {
  const BACKEND_URL = "http://localhost:8000/getrequester";
  const [request, setRequest] = useState("");
  useEffect(() => {
    const fun = async () => {
      console.log((await axios.post(BACKEND_URL, { id: _id })).data);
      setRequest((await axios.post(BACKEND_URL, { id: _id })).data.user.name);
    };
    fun();
  }, [typeselected]);
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const fun = async () => {
      setPhone((await axios.post(BACKEND_URL, { id: _id })).data.user.phone);
    };
    fun();
  }, [typeselected]);
  const ACCEPT_BACKEND_URL = "http://localhost:8000/handleaccept";
  const handleAccept = async (e) => {
    const resp = await axios.post(ACCEPT_BACKEND_URL, { postid: _id });
    alert(resp.data.message);
  };
  const DECLINE_BACKEND_URL = "http://localhost:8000/handledecline";
  const handleDecline = async (e) => {
    const resp = await axios.post(DECLINE_BACKEND_URL, { postid: _id });
    alert(resp.data.message);
  };
  const DBACKEND_URL = "http://localhost:8000/handledel";
  const handleDelete = async (e) => {
    e.preventDefault();
    const resp = await axios.post(DBACKEND_URL, { postid: _id });
    alert(resp.data.message);
  };
  const RENT_BACKEND_URL = "http://localhost:8000/handlerent";
  const handleRent = async (e) => {
    e.preventDefault();
    // console.log("hi");
    const resp = await axios.post(RENT_BACKEND_URL, {
      postid: _id,
      requestedBy: JSON.parse(localStorage["college_trader_data"])._id,
    });
    alert(resp.data.message);
  };
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card ">
        <img src={imgUrl} alt="" className="card-img-top" />

        <div className="class-body">
          <h3 className="card-title">{item}</h3>
          <p className="card-text">
            Price:{price}
            <br />
            Date Range:{startDate?.substr(0,10)} - {endDate?.substr(0,10)}
          </p>
        </div>
        {/* <div className="after_card_text"> */}
        {JSON.parse(localStorage["college_trader_data"])._id === postedBy ? (
          request ? (
            type === "Requested" ? (
              <div>
                <p className="non_button">
                  Request from {request} Contact no: {phone}
                </p>
                <div>
                  <button className="btn btn-success card_button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAccept(e);
                    }}
                  >
                    Accept
                  </button>
                  <button className="btn btn-secondary card_button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDecline(e);
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ) : (
              <div>{type}</div>
            )
          ) : (
            <div>
              <p className="non_button">No requests Yet</p>
              <button className="btn btn-danger card_button"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                Delete
              </button>
            </div>
          )
        ) : (
          <div>
            {request ? (
              <p className="non_button">Already {type}</p>
            ) : type === "Rent" ? (
              <button className="btn btn-primary card_button"
                onClick={(e) => {
                  handleRent(e);
                }}
              >
                Rent
              </button>
            ) : (
              <button className="btn btn-primary card_button"
                onClick={(e) => {
                  handleRent(e);
                }}
              >
                Buy
              </button>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default ItemCard;
