import "./styles.css";
import React, { useEffect, useState } from "react";
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
  },
  button: {
    margin: theme.spacing(2, 0),
    width: "100%",
  },
  link: {
    margin: theme.spacing(2, 0),
    color: "#4caf50",
    fontWeight: "bold",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [upiId, setUpiId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const BACKEND_BASE_URL = "http://localhost:8000";
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${BACKEND_BASE_URL}/register`, {
      email: email,
      password: password,
      upiId: upiId,
      phone: phoneNumber,
    });
    if (res.status == "200") {
      navigate("/login");
    }
    console.log(
      `Email: ${email}, Password: ${password}, UPI ID: ${upiId}, Phone Number: ${phoneNumber}`
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
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Sign In
            </Button>
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
