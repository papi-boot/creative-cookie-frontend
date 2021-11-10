import React, { Fragment } from "react";
import { GlobalDataContext } from "context/GlobalData";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";
const CommentList = () => {
  const { showPostDetail, userInfo, postReloader } = React.useContext(
    GlobalDataContext
  );
  const commentMenuBtnRef = React.useRef(null);

  React.useEffect(() => {
    const commentMenu = document.querySelectorAll(".dropdown-toggle");
    commentMenu.forEach((item, i) => {
      item.classList.remove("dropdown-toggle");
    });
  }, [postReloader]);
  return (
    <Fragment>
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
                      <Dropdown.Item>
                        <span>
                          <i className="bi bi-pencil-square"></i>&nbsp;Edit
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <span>
                          <i className="bi bi-trash-fill"></i>&nbsp;Delete
                        </span>
                      </Dropdown.Item>
                    </Fragment>
                  ) : (
                    ""
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
          <h4 className="text-center text-black-50"><span><i className="bi bi-chat-fill"></i>&nbsp;No discussion found</span></h4>
        </div>
      )}
    </Fragment>
  );
};
export default CommentList;
