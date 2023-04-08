import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { makeStyles } from "@material-ui/core";
import Marketplace from "./pages/Marketplace";
import UploadForRent from "./pages/UploadForRent";
import SellRequests from "./pages/SellRequests";
import GetRequests from "./pages/GetRequests";
// import Uploadform from "./components/UploadForm";
function App() {
  const useStyles = makeStyles((theme) => ({
    body: {
      fontFamily: "Genos, sans-serif", // set Genos as the font here
    },
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "green",
    },
    title: {
      flexGrow: 1,
    },
    button: {
      color: "#fff",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.body}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/uploadforrent" element={<UploadForRent />} />
        <Route path="/sellrequests" element={<SellRequests />} />
        <Route path="/getrequests" element={<GetRequests />} />
      </Routes>
    </div>
  );
}

export default App;
