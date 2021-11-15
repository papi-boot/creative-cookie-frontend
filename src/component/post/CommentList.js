import React, { Fragment } from "react";
import { GlobalDataContext } from "context/GlobalData";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
import EditCommentModal from "component/comment/EditCommentModal";
import CommentDeleteModal from "component/comment/CommentDeleteModal";
const CommentList = () => {
  const { showPostDetail, userInfo, postReloader } = React.useContext(
    GlobalDataContext
  );
  const commentMenuBtnRef = React.useRef(null);
  const editCommentModalRef = React.useRef(null);
  const commentDeleteModalRef = React.useRef(null);
  React.useEffect(() => {
    const commentMenu = document.querySelectorAll(".dropdown-toggle");
    commentMenu.forEach((item, i) => {
      item.classList.remove("dropdown-toggle");
    });
  }, [postReloader]);

  // @TODO: submit update comment
  const openCommentEditorModal = (item) => {
    editCommentModalRef.current.getCommentInfo(
      item.comment_id,
      item.comment_content
    );
    editCommentModalRef.current.toggleModal();
  };

  // @TODO: open delete comment modal for assurance
  const openDeleteCommentModal = (item) => {
    commentDeleteModalRef.current.toggleModal(item.comment_id);
  };
  return (
    <Fragment>
      <EditCommentModal ref={editCommentModalRef} />
      <CommentDeleteModal ref={commentDeleteModalRef} />
      {showPostDetail.post_comment.length > 0 ? (
        showPostDetail.post_comment.map((item) => (
          <div className="comment-card-wrapper up" key={item.comment_id}>
            <div className="comment-header d-flex align-items-center justify-content-between border-bottom">
              <div
                className="comment-user-name"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <h6
                  className="m-0"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>
                    <i className="bi bi-person-circle"></i>&nbsp;
                    {item.user_full_name}
                  </span>
                </h6>
              </div>
              <div className="comment-menu-dropdown-wrapper">
                <DropdownButton
                  bsPrefix="comment-menu-btn"
                  ref={commentMenuBtnRef}
                  drop="start"
                  size="sm"
                  menuVariant="dark"
                  title={
                    <span>
                      <i className="bi bi-three-dots-vertical"></i>
                    </span>
                  }
                >
                  {userInfo.user_id === item.comment_user_ref ? (
                    <Fragment>
                      <Dropdown.Header>
                        <span>
                          <i className="bi bi-gear-fill"></i>&nbsp;Comment
                          Options
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item
                        onClick={() => openCommentEditorModal(item)}
                      >
                        <span>
                          <i className="bi bi-pencil-square"></i>&nbsp;Edit
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => openDeleteCommentModal(item)}
                      >
                        <span>
                          <i className="bi bi-trash-fill"></i>&nbsp;Delete
                        </span>
                      </Dropdown.Item>
                    </Fragment>
                  ) : (
                    <Dropdown.Item>
                      <span>
                        <i className="bi bi-exclamation-circle-fill"></i>
                        &nbsp;Report
                      </span>
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              </div>
            </div>
            <div className="comment-created-at">
              <span style={{ fontSize: ".8rem" }}>
                <i className="bi bi-clock"></i>&nbsp;
                {formatDistanceToNow(new Date(item.comment_created_at), {
                  addSuffix: true,
                })}
                &nbsp;
                {new Date(item.comment_created_at) <
                new Date(item.comment_updated_at) ? (
                  <span>
                    <i className="bi bi-dot"></i>Edited
                  </span>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div
              className="comment-content my-2"
              dangerouslySetInnerHTML={{ __html: item.comment_content }}
            ></div>
          </div>
        ))
      ) : (
        <div className="my-4">
          <h4 className="text-center text-black-50">
            <span>
              <i className="bi bi-chat-fill"></i>&nbsp;No discussion found
            </span>
          </h4>
        </div>
      )}
    </Fragment>
  );
};
export default CommentList;
