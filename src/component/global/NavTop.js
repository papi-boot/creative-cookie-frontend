/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, NavDropdown, Badge } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { useFetch } from "../../api/useFetch";
import SpinnerLoad from "./SpinnerLoad";
const NavTop = () => {
  const history = useHistory();
  const {
    userInfo,
    setGlobalMessage,
    useNotify,
    setIsAuthenticated,
    setDataReloader,
    dataReloader,
    setUserInfo
  } = React.useContext(GlobalDataContext);
  const nvTopSpinnerLoadRef = React.useRef(null);
  const logOutRequest = (e) => {
    nvTopSpinnerLoadRef.current.toggleSpinner();
    useFetch(null, "GET", "logout", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            nvTopSpinnerLoadRef.current.toggleSpinner();
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setIsAuthenticated(res.isAuthenticated);
            setUserInfo(res.user);
            history.push("/authenticate");
          } else {
            nvTopSpinnerLoadRef.current.toggleSpinner();
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
      <Navbar
        bg="light"
        sticky="top"
        className="main-nav nav-top border-bottom"
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className="navbar-brand">
            <h4 className="fw-bold m-0 std-black">Creative Cookie</h4>
          </div>
          <div className="nav-list-wrapper">
            <ul className="nav-list d-flex align-items-center m-0 p-0">
              <li className="nav_item">
                <NavLink
                  activeClassName="link-active"
                  className="nav_link"
                  to="/dashboard"
                >
                  <span>
                    <i className="bi bi-house-door-fill"></i>&nbsp;Home
                  </span>
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink
                  activeClassName="link-active"
                  className="nav_link"
                  to="/write-post"
                >
                  <span>
                    <i className="bi bi-pencil-square"></i>&nbsp;Write
                  </span>
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink
                  activeClassName="link-active"
                  className="nav_link"
                  to="/notifacation"
                >
                  <div style={{ position: "relative" }}>
                    <span>
                      <i className="bi bi-bell"></i>&nbsp;Notification&nbsp;
                    </span>
                    <Badge
                      pill
                      style={{
                        position: "absolute",
                        top: "-.3rem",
                        right: "-1rem",
                      }}
                      bg="danger"
                      size="sm"
                    >
                      3
                    </Badge>
                  </div>
                </NavLink>
              </li>

              <NavDropdown
                menuVariant="dark"
                className="p-0"
                title={
                  <span className="fw-bold std-black">
                    <i className="bi bi-person-circle"></i>&nbsp;
                    {userInfo.user_full_name}
                  </span>
                }
              >
                <NavDropdown.Item>
                  <span>
                    &nbsp;Profile&nbsp;<i className="bi bi-gear"></i>
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <button
                    className="std-btn-style mx-0"
                    onClick={(e) => logOutRequest(e)}
                  >
                    <span>
                      Logout&nbsp;<i className="bi bi-box-arrow-in-right"></i>
                    </span>
                    &nbsp;
                    <SpinnerLoad
                      animation="grow"
                      size="sm"
                      ref={nvTopSpinnerLoadRef}
                    />
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </Navbar>
    </Fragment>
  );
};

export default NavTop;
