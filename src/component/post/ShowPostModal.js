import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import { formatDistanceToNow } from "date-fns";
import ToolTip from "component/global/ToolTip";
import ShowPostTabs from "./ShowPostTabs";
const ShowPostModal = React.forwardRef((props, ref) => {
  const { showPostDetail, setPostReloader, postReloader, commentModalRef } = React.useContext(
    GlobalDataContext
  );
  const [show, setShow] = React.useState(false);
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShow(!show);
      setPostReloader(!postReloader);
    },
  }));
  return (
    <Fragment>
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        size="xl"
        enforceFocus={false}
        onEnter={(e) => {
          document.querySelector("html").style.overflowY = "hidden";
        }}
        onExit={(e) => {
          document.querySelector("html").style.overflowY = "auto";
        }}
        scrollable
      >
        <Modal.Header closeButton className="py-3 px-3">
          <Modal.Title>
            <ToolTip
              placement="bottom"
              text={`Thread post by ${showPostDetail.post.user_full_name} - ${
                showPostDetail.post.post_created_at
                  ? formatDistanceToNow(
                      new Date(showPostDetail.post.post_created_at),
                      {
                        addSuffix: true,
                      }
                    )
                  : ""
              }`}
            >
              <div
                className="show-post-header"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    fontSize: "1rem",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <i className="bi bi-chat-text-fill text-primary"></i>
                  &nbsp;Thread post by&nbsp;
                  {showPostDetail.post.user_full_name}&nbsp;
                  <i className="bi bi-clock"></i>&nbsp;
                  {showPostDetail.post.post_created_at
                    ? formatDistanceToNow(
                        new Date(showPostDetail.post.post_created_at),
                        {
                          addSuffix: true,
                        }
                      )
                    : ""}
                </span>
              </div>
            </ToolTip>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 position-relative">
          <ShowPostTabs />
        </Modal.Body>
        <Modal.Footer className="py-1 px-2">
          <Button
            variant="success"
            size="sm"
            onClick={() => commentModalRef.current.toggleModal()}
          >
            Add Comment
          </Button>
          <Button variant="dark" size="sm" onClick={() => close()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});
export default ShowPostModal;
