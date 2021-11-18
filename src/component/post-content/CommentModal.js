import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import CommentEditor from "component/post/CommentEditor";
import SpinnerLoad from "component/global/SpinnerLoad";
const CommentModal = React.forwardRef(({ onePostDetail }, ref) => {
  const { showCommentModal, setShowCommentModal } = React.useContext(
    GlobalDataContext
  );
  const commentBtnSpinRef = React.useRef(null);
  const close = () => setShowCommentModal(!showCommentModal);
  const commentEditorRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShowCommentModal(!showCommentModal);
    },
  }));

  // @TODO: submit comment request
  const submitCommentRequest = () => {
    commentBtnSpinRef.current.toggleSpinner();
    commentEditorRef.current.submitCommentRequestFromNotif(
      onePostDetail.post[0].post_id
    );
  };
  return (
    <Fragment>
      <Modal
        show={showCommentModal}
        onHide={close}
        size="xl"
        enforceFocus={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="m-0">
              <span>
                <i className="bi bi-pencil-square"></i>&nbsp;Write a comment
              </span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <CommentEditor ref={commentEditorRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" size="sm" onClick={submitCommentRequest}>
            Post Comment&nbsp;
            <SpinnerLoad animation="border" size="sm" ref={commentBtnSpinRef} />
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});

export default CommentModal;
