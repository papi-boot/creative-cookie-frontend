/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { withRouter, useHistory, Link } from "react-router-dom";
import { useFetch } from "api/useFetch";
import { ListGroup } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import SpinnerLoad from "component/global/SpinnerLoad";
const ProfileListMobile = () => {
  const history = useHistory();
  const {
    userInfo,
    setGlobalMessage,
    useNotify,
    setIsAuthenticated,
    setUserInfo,
  } = React.useContext(GlobalDataContext);
  const nvBottomSpinnerLoadRef = React.useRef(null);
  const logOutRequest = (e) => {
    nvBottomSpinnerLoadRef.current.toggleSpinner();
    useFetch(null, "GET", "logout", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            nvBottomSpinnerLoadRef.current.toggleSpinner();
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setIsAuthenticated(res.isAuthenticated);
            setUserInfo(res.user);
            history.replace("/authenticate");
          } else {
            nvBottomSpinnerLoadRef.current.toggleSpinner();
            throw new Error("Something went wrong. Please try again or later");
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        console.error(err);
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  };
  return (
    <Fragment>
      <div className="profile-mob-list-settings">
        <ListGroup>
          <Link to="/profile" className="text-decoration-none">
            <ListGroup.Item action className="py-3">
              <span className="fw-bold">
                <i className="bi bi-gear-fill"></i>&nbsp;Profile
              </span>
            </ListGroup.Item>
          </Link>
          <ListGroup.Item action className="py-3" onClick={logOutRequest}>
            <span className="fw-bold">
              <i className="bi bi-box-arrow-left"></i>&nbsp;Logout
            </span>
            &nbsp;
            <SpinnerLoad
              animation="grow"
              size="sm"
              ref={nvBottomSpinnerLoadRef}
            />
          </ListGroup.Item>
        </ListGroup>
      </div>
    </Fragment>
  );
};
export default withRouter(ProfileListMobile);
