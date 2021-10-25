import React, { Fragment } from "react";
import { GlobalDataContext } from "../context/GlobalData";
import { Tabs, Tab } from "react-bootstrap";
import Register from "../pages-component/authenticate/Register";
import Login from "../pages-component/authenticate/Login";
const Authenticate = () => {
  const [currentTab, setCurrentTab] = React.useState("Login");
  return (
    <Fragment>
      <div className="container std-height d-flex align-items-center justify-content-center flex-column">
        <Tabs
          activeKey={currentTab}
          onSelect={(tab) => setCurrentTab(tab)}
          className="mb-3"
        >
          <Tab eventKey="Login" title={<span className="fw-bold">Login&nbsp;<i className="bi bi-arrow-down-circle-fill"></i></span>}>
            <Login/>
          </Tab>
          <Tab
            eventKey="Register"
            title={<span className="fw-bold">Register&nbsp;<i className="bi bi-arrow-down-circle-fill"></i></span>}
          >
            <Register />
          </Tab>
        </Tabs>
      </div>
    </Fragment>
  );
};
export default Authenticate;
