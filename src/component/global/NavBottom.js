import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Button, Badge } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import WritePostModal from "./WritePostModal";
import ToolTip from "./ToolTip";
const NavBottom = () => {
  const { notification, userInfo, showCreatePostBtnMob } = React.useContext(
    GlobalDataContext
  );
  const writePostModalRef = React.useRef(null);
  const style = {
    fontSize: "1.2rem",
  };

  // @TODO: open WritePostModal
  const openWritePostModal = () => {
    writePostModalRef.current.toggleModal();
  };

  // @TODO: filter notification
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
      <Navbar className="main-nav nav-bottom p-0" bg="light" fixed="bottom">
        <div className="d-flex align-items-center justify-content-between w-100 p-1 border-top position-relative">
          {showCreatePostBtnMob ? (
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
          ) : (
            ""
          )}
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
                <span style={style} className="position-relative">
                  <i className="bi bi-bell-fill"></i>
                  <span
                    style={{
                      fontSize: ".7rem",
                      position: "absolute",
                      right: "-.6rem",
                      top: "-.2rem",
                    }}
                  >
                    {getNotification().length > 0 ? (
                      <Badge pill bg="danger">
                        {getNotification().length}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </span>
                </span>
              </NavLink>
            </ToolTip>
          </div>
          <div className="bottom-nav-item me w-100 d-flex align-items-center justify-content-center flex-column">
            <ToolTip placement="top" text="Profile">
              <NavLink
                activeClassName="link-active"
                className="w-100 text-center justify-content-center"
                to="/profile-mob"
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
