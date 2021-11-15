/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { useSocket } from "api/useSocket";
import { GlobalDataContext } from "context/GlobalData";
import SpinnerLoad from "component/global/SpinnerLoad";
const CommentDeleteModal = React.forwardRef((props, ref) => {
  const {
    setGlobalMessage,
    useNotify,
    setPostReloader,
    postReloader,
  } = React.useContext(GlobalDataContext);
  const [show, setShow] = React.useState(false);
  const [commentID, setCommentID] = React.useState("");
  const deleteCommentBtnSpinLoadRef = React.useRef(null);
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleModal(comment_id) {
      setCommentID(comment_id);
      setShow(!show);
    },
  }));

  // TODO: submit edit comment request
  const submitDeleteCommentRequest = () => {
    deleteCommentBtnSpinLoadRef.current.toggleSpinner();
    const params = {
      comment_id: commentID,
    };
    useFetch(params, "DELETE", "comment", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPostReloader(!postReloader);
            deleteCommentBtnSpinLoadRef.current.toggleSpinner();
            useSocket().emit("delete comment", "Delete Comment");
            close();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            deleteCommentBtnSpinLoadRef.current.toggleSpinner();
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  };
  return (
    <Fragment>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="text-danger">
              <span>
                <i className="bi bi-exclamation-circle-fill"></i>&nbsp;Wait,
                Hang on....
              </span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your comment?</Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="danger"
            type="button"
            onClick={() => submitDeleteCommentRequest()}
          >
            <span>
              Delete my comment&nbsp;<i className="bi bi-trash-fill"></i>&nbsp;
              <SpinnerLoad
                animation="border"
                size="sm"
                ref={deleteCommentBtnSpinLoadRef}
              />
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});

export default CommentDeleteModal;
