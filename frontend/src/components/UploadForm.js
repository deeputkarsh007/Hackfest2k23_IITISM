import React, { useState, useEffect } from "react";
import "./UploadForm.css";
import ImageUploader from "./ImageUpload";
import { upload } from "@testing-library/user-event/dist/upload";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
const Uploadform = () => {
  const BACKEND_URL = "http://localhost:8000/uploadtoDB";
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredStartingDate, setEnteredStartingDate] = useState("");
  const [enteredStaringTime, setEnteredStartingTime] = useState("");
  const [enteredEndingDate, setEnteredEndingDate] = useState("");
  const [enteredEndingTime, setEnteredEndingTime] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [enteredLabel, setEnteredLabel] = useState("Rate of the Product");
  const [enteredOption, setEnteredOption] = useState("Rent");
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setEnteredStartingDate("");
    setEnteredStartingTime("");
    setEnteredEndingDate("");
    setEnteredEndingTime("");
  }, [enteredOption]);
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const startingDateChangeHandler = (event) => {
    setEnteredStartingDate(event.target.value);
  };
  const startingTimeChangeHandler = (event) => {
    setEnteredStartingTime(event.target.value);
  };
  const endingDateChangeHandler = (event) => {
    setEnteredEndingDate(event.target.value);
  };
  const endingTimeChangeHandler = (event) => {
    setEnteredEndingTime(event.target.value);
  };

  // const [enteredLabel, setEnteredLabel] = useState("Rate of the Product");
  // const [enteredOption, setEnteredOption] = useState("Rent");
  // const [disabled, setDisabled] = useState(false);
  const dropDownChangeHandler = (event) => {
    const val = event.target.value.toString();
    if (val === "Rent") {
      setEnteredOption("Rent");
      setEnteredLabel("Rate of the Product");
      if (disabled) setDisabled(!disabled);
    } else {
      setEnteredOption("Sell");
      setEnteredLabel("Amount of the Product");
      setDisabled(!disabled);
    }
  };
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("hio");
    const newItemDetail = {
      type: enteredOption,
      title: enteredTitle,
      description: enteredDescription,
      amount: enteredAmount,
      startingDate: new Date(enteredStartingDate),
      startingTime: enteredStaringTime,
      endingDate: new Date(enteredEndingDate),
      endingTime: enteredEndingTime,
      img_url: imgUrl,
      postedBy: JSON.parse(localStorage["college_trader_data"])._id,
    };
    console.log(newItemDetail);
    const res = await axios.post(BACKEND_URL, newItemDetail);
    // function refreshPage() {
    //   window.location.reload(false);
    // }
    if (res.status == "200") {
      toast.success("Adding Your Product !", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      toast.failure("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredAmount("");
    setEnteredStartingDate("");
    setEnteredStartingTime("");
    setEnteredEndingDate("");
    setEnteredEndingTime("");
    setImgUrl("");
    setTimeout(() => {
      navigate("/marketplace");
    }, 2000);
  };
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }; //showToastMessage
  return (
    <div id="FormMain">
      <form className="new-form" onSubmit={submitHandler}>
        <div className="new-form__info">
          <div className="new-form__control" style={{ width: "100%" }}>
            <select
              value={enteredOption}
              onChange={dropDownChangeHandler}
              style={{
                width: "141px",
                height: "28px",
                padding: "0px 2px",
                margin: "0px 10px",
              }}
            >
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <div className="new-form__control">
            <label>Title</label>
            <input
              // style={{opacity:'1'}}
              type="text"
              placeholder="Name of the item"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-form__control">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description of the item"
              value={enteredDescription}
              onChange={descriptionChangeHandler}
            />
          </div>
          <div className="new-form__control">
            <label>{enteredLabel}</label>
            <input
              type="text"
              placeholder="Enter your amount"
              value={enteredAmount}
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-form__control" >
            <label>Starting Date</label>
            <input
              disabled={disabled}
              type="date"
              min="2023-04-08"
              max="2025-12-31"
              value={enteredStartingDate}
              onChange={startingDateChangeHandler}
            />
          </div>

          <div className="new-form__control">
            <label>Starting Time</label>
            <input
              disabled={disabled}
              type="time"
              id="time"
              value={enteredStaringTime}
              onChange={startingTimeChangeHandler}
            />
          </div>
          <div className="new-form__control">
            <label>Ending Date</label>
            <input
              disabled={disabled}
              type="date"
              min="2023-04-08"
              max="2025-12-31"
              value={enteredEndingDate}
              onChange={endingDateChangeHandler}
            />
          </div>
          <div className="new-form__control">
            <label>Ending Time</label>
            <input
              disabled={disabled}
              type="time"
              id="time"
              value={enteredEndingTime}
              onChange={endingTimeChangeHandler}
            />
          </div>
          <ImageUploader setImgUrl={setImgUrl} uploaded={uploaded} />
        </div>
        <div className="new-form__actions">
          <button
            type="submit"
            onClick={(e) => {
              console.log(uploaded);
              setUploaded(true);
              submitHandler(e);
            }}
          >
            Add the Product
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};
export default Uploadform;
