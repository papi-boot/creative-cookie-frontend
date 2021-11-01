import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { formatDistanceToNow } from "date-fns";
import ToolTip from "../../component/global/ToolTip";
import ShowPostTabs from "./ShowPostTabs";
const ShowPostModal = React.forwardRef((props, ref) => {
  const { showPostDetail, setPostReloader, postReloader } = React.useContext(
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
      <Modal show={show} onHide={close} backdrop="static" fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>
            <ToolTip
              placement="bottom"
              text={`Thread post by ${
                showPostDetail.user_full_name
              } - ${formatDistanceToNow(new Date(showPostDetail.post_created_at), {
                addSuffix: true,
              })}`}
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
                  {showPostDetail.user_full_name}&nbsp;
                  <i className="bi bi-clock"></i>&nbsp;
                  {showPostDetail.post_created_at
                    ? formatDistanceToNow(
                        new Date(showPostDetail.post_created_at),
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
});
export default ShowPostModal;
