import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
// import '../index.css'
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const backGround = {
    padding: "5px 13px",
    backgroundColor: "#00ABB3",
    opacity: "0.95",
  };
  const AppCss = {
    color: "white",
    padding: "0px",
    margin: "0px",
    fontFamily: "Proxima Nova",
    fontSize: "25px",
  };
  const ItemCss = {
    color: "lightblack",
    fontSize: "20px",
    fontFamily: " Cambria",
    margin: "3px",
  };

  const ButtonCss = {
    color: "rgba(255, 255, 255, 0.82)",
    backgroundColor: "#f3e8e8",
    border: "var(--bs-border-width) solid rgba(255, 253, 253, 0.36)",
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg " style={backGround}>
        <div className="container-fluid">
          <a className="navbar-brand " href="#">
            <p>
              <span class="college">College</span>
              <span class="trader">-trader</span>
            </p>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={ButtonCss}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div style={{ marginLeft: "auto" }}>
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ fontSize: "25px", textAlign: "center" }}
              >
                <li className="nav-item ">
                  <a
                    className="nav-link  "
                    aria-current="page"
                    href="#"
                    style={ItemCss}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    style={ItemCss}
                    onClick={() => {
                      navigate("/uploadforrent");
                    }}
                  >
                    Sell an Item
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link "
                    href="#"
                    style={ItemCss}
                    onClick={() => {
                      navigate("/marketplace");
                    }}
                  >
                    Marketplace
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    style={ItemCss}
                    onClick={() => {
                      navigate("/getrequests");
                    }}
                  >
                    Get Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    style={ItemCss}
                    onClick={() => {
                      console.log("hi");
                      navigate("/sellrequests");
                    }}
                  >
                    Sell Requests
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    style={ItemCss}
                    onClick={() => {
                      localStorage.setItem("college_trader_data", "");
                      // console.log("hi");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Helmet>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
          integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/js/bootstrap.min.js"
          integrity="sha384-heAjqF+bCxXpCWLa6Zhcp4fu20XoNIA98ecBC1YkdXhszjoejr5y9Q77hIrv8R9i"
          crossorigin="anonymous"
        ></script>
      </Helmet>
    </div>
  );
};

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     marginTop: 0, // add this to remove white space on top
//   },
//   appBar: {
//     backgroundColor: "green",
//   },
//   title: {
//     flexGrow: 1,
//     fontFamily: "Genos, sans-serif",
//   },
//   button: {
//     color: "#fff",
//     fontFamily: "Genos, sans-serif",
//   },
// }));

// const Navbar = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();
//   return (
//     <div className={classes.root}>
//       <AppBar position="static" className={classes.appBar}>
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             My App
//           </Typography>
//           <Button
//             onClick={() => {
//               navigate("/");
//             }}
//             className={classes.button}
//           >
//             Home
//           </Button>
//           <Button
//             onClick={() => {
//               navigate("/");
//             }}
//             className={classes.button}
//           >
//             Sell An Item
//           </Button>
//           <Button
//             onClick={() => {
//               navigate("/marketplace");
//             }}
//             className={classes.button}
//           >
//             Marketplace
//           </Button>
//           <Button
//             onClick={() => {
//               navigate("/");
//             }}
//             className={classes.button}
//           >
//             Get Requests
//           </Button>
//           <Button
//             onClick={() => {
//               navigate("/");
//             }}
//             className={classes.button}
//           >
//             Sell Requests
//           </Button>
//           {localStorage["college_trader_data"] && (
//             <Button
//               onClick={() => {
//                 localStorage.setItem("college_trader_data", "");
//                 navigate("/login");
//               }}
//               className={classes.button}
//             >
//               Logout
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

export default Navbar;
