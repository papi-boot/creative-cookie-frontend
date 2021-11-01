/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { useFetch } from "../../api/useFetch";
import EditorField from "../../context/EditorField";
import SpinnerLoad from "./SpinnerLoad";
const WritePostModal = React.forwardRef((props, ref) => {
  const { setGlobalMessage, useNotify, setPostReloader, postReloader } = React.useContext(GlobalDataContext);
  const [show, setShow] = React.useState(false);
  const close = () => setShow(!show);
  const editorFieldRef = React.useRef(null);
  const spinnerLoadPublishPostRef = React.useRef(null);
  const spinnerLoadSaveDraftRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShow(!show);
    },
  }));

  // @TODO: create new post
  const publishPost = (_post_content, _post_tag) => {
    const params = {
      post_content: _post_content,
      post_tag: _post_tag,
    };
    useFetch(params, "POST", "post", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPostReloader(!postReloader);
            spinnerLoadPublishPostRef.current.toggleSpinner();
            close();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            spinnerLoadPublishPostRef.current.toggleSpinner();
          }
        } else {
          throw new Error("Something went wrong please try again or later");
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
      <Modal
        show={show}
        onHide={close}
        size="xl"
        backdrop="static"
        enforceFocus={false}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-bold">
              <i className="bi bi-pencil-square"></i>&nbsp;Write a Post
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <EditorField ref={editorFieldRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm">
            <span>
              Save Draft&nbsp;<i className="bi bi-archive"></i>
            </span>
          </Button>
          <Button
            size="sm"
            variant="success"
            onClick={() => {
              const {
                post_content,
                post_tag,
              } = editorFieldRef.current.togglePublishPostRequest();
              publishPost(post_content, post_tag);
              spinnerLoadPublishPostRef.current.toggleSpinner();
            }}
          >
            <span>
              Publish Post&nbsp;
              <i className="bi bi-arrow-right-circle-fill"></i>&nbsp;
              <SpinnerLoad
                animation="border"
                size="sm"
                ref={spinnerLoadPublishPostRef}
              />
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});

export default WritePostModal;
