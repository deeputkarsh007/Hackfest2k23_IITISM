import React, { useEffect, useState } from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Container,
  Typography,
  Link,
} from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: theme.spacing(1),
    width: "100%",
    margin:'15px'
    
  },
  button: {
    margin: theme.spacing(2, 0),
    width: "100%",
    backgroundColor: "#00ABB3",
    "&:hover": {
      backgroundColor: "#00ABB3",
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BACKEND_BASE_URL = "http://localhost:8000";
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(`${BACKEND_BASE_URL}/login`, {
      email: email,
      password: password,
    });
    alert(res.data.message);
    if (res.status == "200") {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    if (res.data.message === "login successful") {
      localStorage.setItem(
        "college_trader_data",
        JSON.stringify(res.data.user)
      );
    } else {
      alert("Something went wrong");
    }
    // console.log(`Email: ${email}, Password: ${password}`);
  };
  useEffect(() => {
    // console.log("object");
    // console.log(localStorage["college_trader_data"]);
    if (localStorage["college_trader_data"]) {
      // console.log("object");
      navigate("/");
    }
  }, []);
  return (
    
    <div id="SignIn">
      <Container maxWidth="xs" id="SignInContainer">
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
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Sign In
          </Button>
          <Link href="/register" className={classes.link}>
            Don't have an account? Sign up here
          </Link>
        </form>
      </Container>
    </div>
  );
}

export default Login;
