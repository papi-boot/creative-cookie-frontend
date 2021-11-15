import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import SpinnerLoad from "component/global/SpinnerLoad";
import EditCommentEditor from "./EditCommentEditor";
const EditCommentModal = React.forwardRef((props, ref) => {
  const { showEditCommentModal, setShowEditCommentModal } = React.useContext(
    GlobalDataContext
  );
  const [commentDetail, setCommentDetail] = React.useState({});
  const editCommentBtnSpinLoadRef = React.useRef(null);
  const editCommentEditorRef = React.useRef(null);
  const close = () => setShowEditCommentModal(!showEditCommentModal);

  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShowEditCommentModal(!showEditCommentModal);
    },
    getCommentInfo(commentID, commentContent) {
      setCommentDetail({ commentID, commentContent });
    },
  }));

  // @TODO: submit edit comment request;
  const submitEditCommentRequest = () => {
    editCommentBtnSpinLoadRef.current.toggleSpinner();
    editCommentEditorRef.current.submitEditCommentRequest();
  };
  return (
    <Fragment>
      <Modal
        show={showEditCommentModal}
        onHide={close}
        backdrop="static"
        enforceFocus={false}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>
              <span>
                <i className="bi bi-pencil-square"></i>&nbsp;Edit your Comment
              </span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <EditCommentEditor
            ref={editCommentEditorRef}
            commentID={commentDetail.commentID}
            commentContent={commentDetail.commentContent}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="success"
            onClick={() => submitEditCommentRequest()}
          >
            Update Comment&nbsp;
            <span>
              <SpinnerLoad
                size="sm"
                animation="border"
                ref={editCommentBtnSpinLoadRef}
              />
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
});

export default EditCommentModal;
