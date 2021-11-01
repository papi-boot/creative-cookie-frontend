/*eslint-disable react-hooks/rules-of-hooks*/
import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { useFetch } from "../../api/useFetch";
import EditorField from "../../context/EditorField";
import SpinnerLoad from "./SpinnerLoad";
const EditPostModal = React.forwardRef((props, ref) => {
  const {
    editPostDetail,
    setPostReloader,
    setEditPostDetail,
    postReloader,
    setGlobalMessage,
    useNotify,
  } = React.useContext(GlobalDataContext);
  const [show, setShow] = React.useState(false);
  const saveChangesSpinnerLoadRef = React.useRef(null);
  const editorFieldRef = React.useRef(null);
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShow(!show);
    },
  }));
  // @TODO: send edit post request
  const editPostRequest = () => {
    saveChangesSpinnerLoadRef.current.toggleSpinner();
    const {
      post_content,
      post_tag,
    } = editorFieldRef.current.togglePublishPostRequest();
    const params = {
      post_id: editPostDetail.post_id,
      post_content,
      post_tag,
    };
    useFetch(params, "PUT", "post", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPostReloader(!postReloader);
            setEditPostDetail({ post_id: "", post_content: "", post_tag: [] });
            saveChangesSpinnerLoadRef.current.toggleSpinner();
            close();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            saveChangesSpinnerLoadRef.current.toggleSpinner();
          }
        } else {
          throw new Error("Something went wrong. Please try again later.");
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
        backdrop="static"
        size="xl"
        enforceFocus={false}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="fw-bold">
              <i className="bi bi-pencil-square"></i>&nbsp;Edit Post
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <EditorField ref={editorFieldRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" size="md" onClick={() => editPostRequest()}>
            Save Changes&nbsp;
            <span>
              <i className="bi bi-check-circle-fill"></i>
            </span>
            &nbsp;
            <SpinnerLoad
              animation="border"
              size="sm"
              ref={saveChangesSpinnerLoadRef}
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});
export default EditPostModal;
