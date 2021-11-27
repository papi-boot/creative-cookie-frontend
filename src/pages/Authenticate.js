/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { GlobalDataContext } from "../context/GlobalData";
import { Tabs, Tab } from "react-bootstrap";
import {useFetch} from "api/useFetch";
import Register from "../pages-component/authenticate/Register";
import Login from "../pages-component/authenticate/Login";
import CookieLogo from "assets/logo/creativecookie.png";
import CookieBanner from "assets/banner/creative-cookie-banner.jpg";
const Authenticate = () => {
  const {
    authenticateTab,
    dataReloader,
    splashScreenRef,
    setGlobalMessage,
    useNotify
  } = React.useContext(GlobalDataContext);
  const [currentTab, setCurrentTab] = React.useState("Login");
  React.useEffect(() => {
    // @TODO: change authenticate tab
    setCurrentTab(authenticateTab);
    useFetch({check: true}, "POST", "profile", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            return;
          } else {
            splashScreenRef.current.classList.add("d-none");
            return;
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {});
  }, [authenticateTab, dataReloader]);
  return (
    <Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
        <div className="my-4 d-flex align-items-center flex-column px-5 w-100">
          <div className="auth-brand">
            <img
              className="my-4"
              style={{ width: "8rem" }}
              src={CookieLogo}
              alt="Creative Cookie Studio"
            />
          </div>
          <Tabs
            activeKey={currentTab}
            onSelect={(tab) => setCurrentTab(tab)}
            className="mb-3"
          >
            <Tab
              eventKey="Login"
              title={<span className="fw-bold">Login</span>}
            >
              <Login />
            </Tab>
            <Tab
              eventKey="Register"
              title={<span className="fw-bold">Register</span>}
            >
              <Register />
            </Tab>
          </Tabs>
        </div>
        <div
          className="banner-img-wrapper w-100 std-height"
          style={{
            backgroundImage: `url(${CookieBanner})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            flexBasis: "250%",
          }}
        ></div>
      </div>
    </Fragment>
  );
};
export default Authenticate;
