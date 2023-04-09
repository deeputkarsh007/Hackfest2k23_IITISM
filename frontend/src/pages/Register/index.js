import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import React, { useEffect, useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router";
const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: theme.spacing(1),
    width: "100%",
    margin: "15px",
  },
  button: {
    margin: theme.spacing(2, 0),
    width: "100%",
    backgroundColor: "#00ABB3",
    "&:hover": {
      backgroundColor: "#00ABB3",
      // textDecoration: "underline",
      // color: "#00ABB3",
    },
  },
  link: {
    margin: theme.spacing(2, 0),
    color: "#00ABB3",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: "#00ABB3",
    },
  },
}));
function Login() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [upiId, setUpiId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const BACKEND_BASE_URL = "http://localhost:8000";
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${BACKEND_BASE_URL}/register`, {
      name: name,
      email: email,
      password: password,
      upiId: upiId,
      phone: phoneNumber,
    });
    if (res.status == "200") {
      toast.success("Successfully Signed Up !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      toast.failure("Something Broke !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    console.log(
      `Name: ${name}, Email: ${email}, Password: ${password}, UPI ID: ${upiId}, Phone Number: ${phoneNumber}`
    );
  };
  useEffect(() => {
    if (localStorage["college_trader_data"]) {
      navigate("/");
    }
  }, []);
  return (
    <ThemeProvider theme={greenTheme}>
      <div id="Register">
        <Container maxWidth="xs" id="RegisterContainer">
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              className={classes.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              className={classes.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              className={classes.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="UPI ID"
              variant="outlined"
              className={classes.input}
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              className={classes.input}
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              required
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              onClick={() => {
                console.log(phoneNumber);

                var phoneno =
                  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (phoneNumber.match(phoneno)) {
                  return true;
                } else {
                  toast.error("Error Notification ! Invalid Phone number", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  return false;
                }
              }}
            >
              Sign Up
            </Button>
            <ToastContainer />
          </form>
          <Link to="/login" className={classes.link}>
            Already have an Account? Login
          </Link>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Login;
