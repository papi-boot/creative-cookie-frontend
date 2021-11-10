/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import CommentEditor from "./CommentEditor";
import CommentList from "./CommentList";
import ToolTip from "component/global/ToolTip";
import SpinnerLoad from "component/global/SpinnerLoad";
const CommentTab = () => {
  const {
    showPostDetail,
    showCommentModal,
    setShowCommentModal,
  } = React.useContext(GlobalDataContext);
  const [toggleCommentField, setToggleCommentField] = React.useState(false);
  const commentEditorRef = React.useRef(null);
  const commentBtnSpinnerLoadRef = React.useRef(null);
  const close = () => {
    setShowCommentModal(!showCommentModal);
  };

  // @TODO: Toggle Comment View
  const toggleCommentFieldView = () => {
    setToggleCommentField(!toggleCommentField);
    setShowCommentModal(!showCommentModal);
  };

  // @TODO: submit comment request
  const submitCommentRequest = () => {
    commentBtnSpinnerLoadRef.current.toggleSpinner();
    commentEditorRef.current.submitCommentRequest();
  };

  // @TODO: comment iterate
  const commentList = () => {
    return showPostDetail.post_comment.map((item) => (
      <div key={item.comment_id}></div>
    ));
  };
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
      <div
        className={`comment-field-opener-wrapper ${
          toggleCommentField ? "up" : ""
        } `}
      >
        <ToolTip placement="top" text="Write a comment">
          <Button
            variant="primary"
            className="comment-field-opener"
            type="button"
            onClick={() => toggleCommentFieldView()}
          >
            <span>
              <i className="bi bi-pencil-square"></i>
            </span>
          </Button>
        </ToolTip>
      </div>
    </Fragment>
  );
};
export default CommentTab;
