/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, NavDropdown, Badge } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { useFetch } from "../../api/useFetch";
import CreativeCookieLogo from "../../assets/logo/creativecookie.png";
import SpinnerLoad from "./SpinnerLoad";
import WritePostModal from "./WritePostModal";
import ToolTip from "./ToolTip";
const NavTop = () => {
  const history = useHistory();
  const {
    userInfo,
    setGlobalMessage,
    useNotify,
    setIsAuthenticated,
    setUserInfo,
    notification,
  } = React.useContext(GlobalDataContext);
  const writePostModalRef = React.useRef(null);
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
            history.replace("/authenticate");
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

  // @TODO: toggle modal open write POST
  const openWritePost = () => {
    writePostModalRef.current.toggleModal();
  };

  //@TODO: filter notifications
  const getNotification = () => {
    const filterNotif = notification.filter(
      (item) =>
        item.post_created_by === userInfo.user_id &&
        item.notif_is_open === false &&
        item.notif_user_ref !== userInfo.user_id
    );
    return filterNotif;
  };
  return (
    <Fragment>
      <WritePostModal ref={writePostModalRef} />
      <div
        className="mobile-navbar d-flex align-items-center justify-content-center p-2 bg-light position-fixed top-0 w-100"
        style={{ zIndex: "1" }}
      >
        <img
          src={CreativeCookieLogo}
          alt="Creative Cookie"
          style={{ width: "5rem" }}
        />
      </div>
      <Navbar bg="light" fixed="top" className="main-nav nav-top border-bottom">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="navbar-brand">
            <img
              src={CreativeCookieLogo}
              alt="Creative Cookie"
              style={{ width: "6rem" }}
            />
          </div>
          <div className="nav-list-wrapper">
            <ul className="nav-list d-flex align-items-center m-0 p-0">
              <li className="nav_item">
                <NavLink
                  activeClassName="link-active"
                  className="nav_link"
                  to="/dashboard"
                >
                  <span className="d-flex align-items-center">
                    <i className="bi bi-house-door-fill"></i>&nbsp;Home
                  </span>
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink className="nav_link" to="#write-post">
                  <button
                    className="std-btn-style std-black"
                    onClick={() => openWritePost()}
                  >
                    <span
                      className="d-flex align-items-center"
                      style={{ fontWeight: "500" }}
                    >
                      <i className="bi bi-pencil-square"></i>&nbsp;Write
                    </span>
                  </button>
                </NavLink>
              </li>
              <li className="nav_item">
                <NavLink
                  activeClassName="link-active"
                  className="nav_link"
                  to="/notification"
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ position: "relative" }}
                  >
                    <span className="d-flex align-items-center">
                      <i className="bi bi-bell-fill"></i>
                      &nbsp;Notification&nbsp;
                    </span>
                    {getNotification().length > 0 ? (
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
                        {getNotification().length}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </div>
                </NavLink>
              </li>

              <NavDropdown
                bsPrefix="profile-dropdown"
                menuVariant="dark"
                className="ms-3"
                title={
                  <ToolTip placement="bottom" text={userInfo.user_full_name}>
                    <div className="d-flex align-items-center">
                      <span className="d-flex align-items-center fw-bold">
                        <i className="bi bi-person-circle"></i>&nbsp;
                        <div
                          style={{
                            overflow: "hidden",
                            width: "max-content",
                            maxWidth: "3.5rem",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {userInfo.user_full_name}
                        </div>
                        <i className="bi bi-chevron-down"></i>
                      </span>
                    </div>
                  </ToolTip>
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
