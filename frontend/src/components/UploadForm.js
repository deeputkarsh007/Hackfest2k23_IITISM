import React, { useState } from "react";
import "./UploadForm.css";
import ImageUpload from "./ImageUpload";
const UploadForm = () => {
  const backendurl = "https://localhost:8000/uploadItemDetail";
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredStartingDate, setEnteredStartingDate] = useState("");
  const [enteredStaringTime, setEnteredStartingTime] = useState("");
  const [enteredEndingDate, setEnteredEndingDate] = useState("");
  const [enteredEndingTime, setEnteredEndingTime] = useState("");
  const [imgurl, setImgUrl] = useState("");
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
  // const imgChangeHandler = (event) => {
  //   setEnteredEndingTime(event.target.value);
  // };
  const submitHandler = (event) => {
    event.preventDefault();

<<<<<<< HEAD
    const newItemDetail = {
      title: enteredTitle,
      description: enteredDescription,
      amount: enteredAmount,
      startingDate: new Date(enteredStartingDate),
      startingTime: enteredStaringTime,
      endingDate: new Date(enteredEndingDate),
      endingTime: enteredEndingTime,
      img_url: imgurl,
      // postedBy: localStorage.getItem['college_trader_data']
    };
    console.log(newItemDetail);
    setEnteredTitle("");
    setEnteredDescription("");
    setEnteredAmount("");
    setEnteredStartingDate("");
    setEnteredStartingTime("");
    setEnteredEndingDate("");
    setEnteredEndingTime("");
  };
  return (
    <form className="new-form" onSubmit={submitHandler}>
      <div className="new-form__info">
        <div className="new-form__control">
          <label>Title</label>
          <input
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
          <label>Amount</label>
          <input
            type="text"
            placeholder="Enter your amount"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-form__control">
          <label>Starting Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2025-12-31"
            value={enteredStartingDate}
            onChange={startingDateChangeHandler}
          />
        </div>

        <div className="new-form__control">
          <label>Starting Time</label>
          <input
            type="time"
            id="time"
            value={enteredStaringTime}
            onChange={startingTimeChangeHandler}
          />
        </div>
        <div className="new-form__control">
          <label>Ending Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredEndingDate}
            onChange={endingDateChangeHandler}
          />
        </div>
        <div className="new-form__control">
          <label>Ending Time</label>
          <input
            type="time"
            id="time"
            value={enteredEndingTime}
            onChange={endingTimeChangeHandler}
          />
        </div>
        <ImageUpload setImgUrl={setImgUrl} />
      </div>
      <div className="new-form__actions">
        <button type="submit">Add the Product</button>
      </div>
    </form>
  );
=======
    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }
    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    }
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }
    const startingDateChangeHandler = event => {
        setEnteredStartingDate(event.target.value);
    }
    const startingTimeChangeHandler = event => {
        setEnteredStartingTime(event.target.value);
    }
    const endingDateChangeHandler = event => {
        setEnteredEndingDate(event.target.value);
    }
    const endingTimeChangeHandler = event => {
        setEnteredEndingTime(event.target.value);
    }

    const [enteredLabel, setEnteredLabel] = useState('Rate of the Product');
    const [enteredOption, setEnteredOption] = useState('Rent');
    const [disabled, setDisabled] = useState(false);
    const dropDownChangeHandler = event => {
        const val = event.target.value.toString();
        if (val === 'Rent') {
            setEnteredOption('Rent');
            setEnteredLabel('Rate of the Product');
            if (disabled)
                setDisabled(!disabled);
        }
        else {
            setEnteredOption('Sell');
            setEnteredLabel('Amount of the Product');
            setDisabled(!disabled);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const newItemDetail = {
            type: enteredOption,
            title: enteredTitle,
            description: enteredDescription,
            amount: enteredAmount,
            startingDate: new Date(enteredStartingDate),
            startingTime: enteredStaringTime,
            endingDate: new Date(enteredEndingDate),
            endingTime: enteredEndingTime,
        };
        console.log(newItemDetail);
        setEnteredTitle('');
        setEnteredDescription('');
        setEnteredAmount('');
        setEnteredStartingDate('');
        setEnteredStartingTime('');
        setEnteredEndingDate('');
        setEnteredEndingTime('');
    }

    return (
        <form className='new-form' onSubmit={submitHandler}>
            <div className='new-form__info'>
                <div className='new-form__control'>
                    <select value={enteredOption} onChange={dropDownChangeHandler}>
                        <option value='Sell'>Sell</option>
                        <option value='Rent'>Rent</option>
                    </select>
                </div>
                <div className='new-form__control'>
                    <label>Title</label>
                    <input type='text' placeholder='Name of the item' value={enteredTitle} onChange={titleChangeHandler} />
                </div>
                <div className='new-form__control'>
                    <label>Description</label>
                    <input type='text' placeholder='Description of the item' value={enteredDescription} onChange={descriptionChangeHandler} />
                </div>
                <div className='new-form__control'>
                    <label>{enteredLabel}</label>
                    <input type='text' placeholder='Enter your amount' value={enteredAmount} onChange={amountChangeHandler} />
                </div>
                <div className='new-form__control'>
                    <label>Starting Date</label>
                    <input disabled={disabled} type='date' min='2019-01-01' max='2025-12-31' value={enteredStartingDate} onChange={startingDateChangeHandler} />
                </div>

                <div className='new-form__control'>
                    <label>Starting Time</label>
                    <input disabled={disabled} type="time" id="time" value={enteredStaringTime} onChange={startingTimeChangeHandler} />
                </div>
                <div className='new-form__control'>
                    <label>Ending Date</label>
                    <input disabled={disabled} type='date' min='2019-01-01' max='2022-12-31' value={enteredEndingDate} onChange={endingDateChangeHandler} />
                </div>
                <div className='new-form__control'>
                    <label>Ending Time</label>
                    <input disabled={disabled} type="time" id="time" value={enteredEndingTime} onChange={endingTimeChangeHandler} />
                </div>
            </div>
            <div className='new-form__actions'>
                <button type='submit'>Add the Product</button>
            </div>
        </form>
    );
>>>>>>> 166d57e7e88e68a03fc197cf8d58b698a3950ace
};
export default UploadForm;
