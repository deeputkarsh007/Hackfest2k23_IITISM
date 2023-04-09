import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import url({'https://fonts.googleapis.com/css2?family=Roboto&display=swap'});
import './UserForm.css'


//css
// const {} = {
//   // fontSize: "20px",
//   // fontFamily: "Times New Roman, Times, serif",
//   // margin: "40px 28px 15px",
//   // color: "black",
//   // fontWeight: "bolder",
//   // fontWeight: '700',
//   // marginBottom: '0.5rem',
//   // display: 'block',
//   // fontSize: '22px',
//   // fontFamily: 'Roboto', 
// };

const inputCss = {
  padding: "9px 15px",
  border: "solid gray 1.85px",
  borderRadius: "8px",
  margin: "0% 2% 30px",
  background:'white'
};
const ButtonCss = {
  color: "white",
  border: "#08d701",
  fontWeight: "bold",
};

const UserForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage["college_trader_data"]) {
      navigate("/login");
    }
  }, []);
  const initialValue = localStorage["college_trader_data"]
    ? {
        name: JSON.parse(localStorage["college_trader_data"]).name,
        email: JSON.parse(localStorage["college_trader_data"]).email,
        upiId: JSON.parse(localStorage["college_trader_data"]).upiId,
        phone: JSON.parse(localStorage["college_trader_data"]).phone,
      }
    : {};
  const [enteredTitle, setEnteredTitle] = useState("Edit Your Information");
  const [enteredName, setEnteredName] = useState(initialValue.name);
  const [enteredEmail, setEnteredEmail] = useState(initialValue.email);
  const [enteredPhone, setEnteredPhone] = useState(initialValue.phone);
  const [enteredUpiId, setEnteredUpiId] = useState(initialValue.upiId);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setEnteredName(initialValue.name);
    setEnteredEmail(initialValue.email);
    setEnteredPhone(initialValue.phone);
    setEnteredUpiId(initialValue.upiId);
  }, [enteredTitle]);
  const formChangeHandler = async (event) => {
    event.preventDefault();
    setDisabled(!disabled);
    if (disabled) setEnteredTitle("Cancel");
    else setEnteredTitle("Edit Your Information");
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const newItemDetail = {
      ...initialValue,
      name: enteredName,
      email: enteredEmail,
      upiId: enteredUpiId,
      phone: enteredPhone,
    };
    setEnteredEmail(newItemDetail.email);
    setEnteredName(newItemDetail.name);
    setEnteredUpiId(newItemDetail.upiId);
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (newItemDetail.phone.match(phoneno)) {
      setEnteredTitle("Edit Your Information");
      console.log(newItemDetail);
      const BACKEND_URL = "http://localhost:8000/updateuserinfo";
      const resp = await axios.post(BACKEND_URL, {
        ...newItemDetail,
        id: JSON.parse(localStorage["college_trader_data"])._id,
      });
      localStorage.setItem(
        "college_trader_data",
        JSON.stringify(resp.data.user)
      );
      console.log(resp);
      toast.success(resp.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setDisabled(!disabled);
      return true;
    } else {
      toast.error("Error Notification ! Invalid Phone number", {
        position: toast.POSITION.TOP_CENTER,
      });
      setEnteredPhone(initialValue.phone);
      return false;
    }
  };

  return (
    <form className="new-form" onSubmit={submitHandler}>
      <div className="new-form__actions">
        <button style={ButtonCss} onClick={formChangeHandler}>
          {enteredTitle}
        </button>
      </div>
      <div className="new-form__info" style={{ display: "block" }}>
        <h2 style={{}}>Personal Information</h2>
        <div className="new-form__control">
          <input
            style={inputCss}
            type="text"
            value={enteredName}
            disabled={disabled}
            onChange={(event) => {
              setEnteredName(event.target.value);
            }}
          />
        </div>
        <h2 style={{}}>Email Id</h2>
        <div className="new-form__control">
          <input
            style={inputCss}
            type="email"
            value={enteredEmail}
            disabled={disabled}
            onChange={(event) => {
              setEnteredEmail(event.target.value);
            }}
          />
        </div>
        <h2 style={{}}>Phone Number</h2>
        <div className="new-form__control">
          <input
            style={inputCss}
            type="tel"
            value={enteredPhone}
            disabled={disabled}
            onChange={(event) => {
              setEnteredPhone(event.target.value);
            }}
          />
        </div>
        <h2 style={{}}>Upi Id</h2>
        <div className="new-form__control">
          <input
            style={inputCss}
            type="text"
            value={enteredUpiId}
            disabled={disabled}
            onChange={(event) => {
              setEnteredUpiId(event.target.value);
            }}
          />
        </div>
      </div>
      {
        <div className="new-form__actions">
          {!disabled && <button type="submit">Submit Your Changes</button>}
        </div>
      }
      <ToastContainer />
    </form>
  );
};
export default UserForm;
