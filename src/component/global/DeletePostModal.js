/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { useFetch } from "../../api/useFetch";
import { useSocket } from "api/useSocket";
import SpinnerLoad from "./SpinnerLoad";
const DeletePostModal = React.forwardRef((props, ref) => {
  const {
    setGlobalMessage,
    useNotify,
    setPostReloader,
    postReloader,
  } = React.useContext(GlobalDataContext);
  const [show, setShow] = React.useState(false);
  const [postID, setPostID] = React.useState("");
  const deletePostSpinnerLoadRef = React.useRef(null);
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleModal(_post_id) {
      setShow(!show);
      setPostID(_post_id);
    },
  }));
  // @TODO: Delete post request
  const deletePostRequest = () => {
    deletePostSpinnerLoadRef.current.toggleSpinner();
    const params = {
      post_id: postID,
    };
    useFetch(params, "DELETE", "post", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPostReloader(!postReloader);
            useSocket().emit("delete post", "Delete Post");
            deletePostSpinnerLoadRef.current.toggleSpinner();
            close();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            deletePostSpinnerLoadRef.current.toggleSpinner();
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage();
      });
  };
  return (
    <Fragment>
      <Modal size="md" backdrop="static" show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="text-danger">
              <i className="bi bi-exclamation-circle-fill"></i>&nbsp;Wait, Hang
              on...
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            "Deleting this post will force to delete all comments too. Are you sure you want to permanently delete this post?"
          }
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deletePostRequest()}
          >
            <span>
              <i className="bi bi-trash-fill"></i>
            </span>
            &nbsp;Delete &nbsp;
            <SpinnerLoad
              animation="border"
              size="sm"
              ref={deletePostSpinnerLoadRef}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});
export default DeletePostModal;
