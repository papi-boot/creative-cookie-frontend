import React, { Fragment } from "react";
import { Badge } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
const NewPostNotify = React.forwardRef((props, ref) => {
  const { newPostNotifyRef, setPostReloader, postReloader } = React.useContext(GlobalDataContext);
  const [show, setShow] = React.useState(false);
  React.useImperativeHandle(ref, () => ({
    closeToast(){
      setShow(false);
    },
    openToast(){
      setShow(true);
    },
    toggleDataReloader(){
      setPostReloader(!postReloader);
    }
  }))
  return (
    <Fragment>
      <div className={`new-post-notify-wrapper ${show ? "toast-up" : "toast-down"}`}>
        <div className="new-post-badge">
          <span>
            <Badge
              variant="pill"
              bg="primary"
              as="button"
              className="p-2 std-btn-style"
              onClick={() => {
                newPostNotifyRef.current.closeToast();
              }}
            >
              <span>
                New Post Added&nbsp;<i className="bi bi-arrow-clockwise"></i>
              </span>
            </Badge>
          </span>
        </div>
      </div>
    </Fragment>
  );
});

export default NewPostNotify;
