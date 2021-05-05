import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbar.js";
import Footer from "components/Footer.js";
import Sidebar from "components/Sidebar.js";
import { useAuth } from "context/auth";
import TableChartIcon from "@material-ui/icons/TableChart"

// import routes from "routes.js";
import { SET_STEREOTYPES } from "../helpers/Actions";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar.jpg";
import logo from "assets/img/logo_inv.png";
import Table from "components/Table";
import { API_URL } from "helpers/Constants";

let ps;



const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {

  const { auth, dispatch } = useAuth();
  // const [stereotypes, setStereotypes] = useState([]);

  React.useEffect(() => {
    fetch(API_URL + "/Stereotype/withGenerationModes", {
      method: 'get'
    }).then(response => response.json())
      .then(response => {
        dispatch({

          type: SET_STEREOTYPES,
          stereotypes: response
        });
        // setStereotypes(response);
      });
  }, []);


  const routes = auth.tables.map((prop, key) => {
    return ({
      name: prop.name,
      layout: '/user/database',
      path: '/' + prop.name,
      icon: TableChartIcon
    });
  });
  const switchRoutes = (
    <Switch>
      {auth.tables.map((prop, key) => {
        return (
          <Route
            exact
            path={"/user/database/" + prop.name}
            render={props => (
              <Table table={prop} /> //stereotypes={stereotypes} />
            )}
            key={key}
          />
        );
      })}
    </Switch>
  );


  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
        {/* {getRoute() ? <Footer /> : null} */}
      </div>
    </div>
  );
}
