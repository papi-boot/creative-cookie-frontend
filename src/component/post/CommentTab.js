/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import SpinnerLoad from "component/global/SpinnerLoad";
const CommentTab = React.forwardRef((props, ref) => {
  const { showCommentModal, setShowCommentModal } = React.useContext(
    GlobalDataContext
  );
  const commentEditorRef = React.useRef(null);
  const commentBtnSpinnerLoadRef = React.useRef(null);
  const close = () => {
    setShowCommentModal(!showCommentModal);
  };

  // @TODO: submit comment request
  const submitCommentRequest = () => {
    commentBtnSpinnerLoadRef.current.toggleSpinner();
    commentEditorRef.current.submitCommentRequest();
  };

  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShowCommentModal(!showCommentModal);
    },
  }));
  return (
    <Fragment>
      <Modal
        show={showCommentModal}
        onHide={close}
        backdrop="static"
        enforceFocus={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="0">
              <span>
                <i className="bi bi-chat-fill text-primary"></i>&nbsp;Write a
                comment...
              </span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <CommentEditor ref={commentEditorRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="success"
            onClick={() => submitCommentRequest()}
          >
            Post Comment&nbsp;
            <SpinnerLoad
              animation="border"
              size="sm"
              ref={commentBtnSpinnerLoadRef}
            />
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <CommentList />
      </Container>
    </Fragment>
  );
});
export default CommentTab;
