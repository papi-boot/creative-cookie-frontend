import React, { Fragment } from "react";
import { GlobalDataContext } from "context/GlobalData";
import { Spinner } from "react-bootstrap";
import CreativeCookie from "assets/logo/creativecookie.png";
const SplashScreen = () => {
  const { splashScreenRef } = React.useContext(GlobalDataContext);
  return (
    <Fragment>
      <div ref={splashScreenRef} className="splash-screen-wrapper">
        <div className="splash-screen-content">
          <img
            className="splash-screen-logo d-block"
            src={CreativeCookie}
            alt="SplashScreen Logo"
          />
          <div className="splash-screen-loading">
            <h6 className="text-center my-4">
              <span>
                <Spinner animation="grow" size="sm" />
                &nbsp;
                <Spinner animation="grow" size="sm" />
                &nbsp;
                <Spinner animation="grow" size="sm" />
                &nbsp;
              </span>
            </h6>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default SplashScreen;
