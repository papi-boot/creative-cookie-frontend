import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import WritePostModal from "./WritePostModal";
import ToolTip from "./ToolTip";
const NavBottom = () => {
  const writePostModalRef = React.useRef(null);
  const style = {
    fontSize: "1.2rem",
  };

  // @TODO: open WritePostModal
  const openWritePostModal = () => {
    writePostModalRef.current.toggleModal();
  };
  return (
    <Fragment>
      <WritePostModal ref={writePostModalRef}/>
      <Navbar className="main-nav nav-bottom p-0" bg="light" fixed="bottom">
        <div className="d-flex align-items-center justify-content-between w-100 p-1 border-top position-relative">
          <div className="write-post-wrapper">
            <Button
              size="lg"
              variant="primary"
              onClick={() => openWritePostModal()}
            >
              <span>
                <i className="bi bi-pen"></i>
              </span>
            </Button>
          </div>
          <div className="bottom-nav-item home w-100 d-flex align-items-center justify-content-center flex-column">
            <ToolTip placement="top" text="Home">
              <NavLink
                activeClassName="link-active"
                className="w-100 text-center justify-content-center"
                to="/dashboard"
              >
                <span style={style}>
                  <i className="bi bi-house-fill"></i>
                </span>
                <br />
              </NavLink>
            </ToolTip>
          </div>
          <div className="bottom-nav-item notificaiton w-100 d-flex align-items-center justify-content-center flex-column">
            <ToolTip placement="top" text="Notification">
              <NavLink
                activeClassName="link-active"
                className="w-100 text-center justify-content-center"
                to="/notification"
              >
                <span style={style}>
                  <i className="bi bi-bell-fill"></i>
                </span>
              </NavLink>
            </ToolTip>
          </div>
          <div className="bottom-nav-item me w-100 d-flex align-items-center justify-content-center flex-column">
            <ToolTip placement="top" text="Profile">
              <NavLink
                activeClassName="link-active"
                className="w-100 text-center justify-content-center"
                to="/profile"
              >
                <span style={style}>
                  <i className="bi bi-person-circle"></i>
                </span>
              </NavLink>
            </ToolTip>
          </div>
        </div>
      </Navbar>
    </Fragment>
  );
};
export default NavBottom;
