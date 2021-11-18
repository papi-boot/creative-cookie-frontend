import React, { Fragment } from "react";
import PlaceholderList from "component/global/PlaceHolderPost";
import { GlobalDataContext } from "context/GlobalData";
import { formatDistanceToNow } from "date-fns";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import EditCommentModal from "component/comment/EditCommentModal";
import CommentDeleteModal from "component/comment/CommentDeleteModal";
import CommentModal from "component/post-content/CommentModal";
import ToolTip from "component/global/ToolTip";
const PostContentComment = ({ onePostDetail }) => {
  const { userInfo, postReloader } = React.useContext(GlobalDataContext);
  const commentMenuBtnRef = React.useRef(null);
  const commentModalRef = React.useRef(null);
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
      <CommentModal ref={commentModalRef} onePostDetail={onePostDetail}/>
      <div className="post-content-write-comment-wrapper d-flex align-items-center justify-content-center p-0 my-0 w-100 position-fixed">
        <ToolTip placement="top" text="Write a Comment">
          <Button
            variant="primary"
            className="px-4"
            style={{
              borderTopLeftRadius: "2rem",
              borderTopRightRadius: "2rem",
            }}
            onClick={() => commentModalRef.current.toggleModal()}
          >
            <span>
              <i className="bi bi-pencil-square"></i>
            </span>
          </Button>
        </ToolTip>
      </div>
      {!onePostDetail.post_comment ? (
        <PlaceholderList />
      ) : (
        <Fragment>
          {onePostDetail.post_comment.length === 0 ? (
            <div>
              <h4 className="text-center text-black-50">
                <span>
                  <i className="bi bi-magic"></i>
                  Empty Comment
                </span>
              </h4>
            </div>
          ) : (
            <Fragment>
              {onePostDetail.post_comment.map((item) => (
                <div
                  className="comment-card-wrapper up"
                  key={item.comment_id}
                  style={{ boxShadow: "3px 5px 10px rgba(70,70,70,.2)" }}
                >
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
                                <i className="bi bi-pencil-square"></i>
                                &nbsp;Edit
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
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PostContentComment;
