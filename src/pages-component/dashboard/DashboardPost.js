import React, { Fragment } from "react";
import { DropdownButton, Dropdown, Badge } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import { formatDistanceToNow } from "date-fns";
import EditPostModal from "../../component/global/EditPostModal";
import DeletePostModal from "../../component/global/DeletePostModal";
import ShowPostModal from "../../component/dashboard/ShowPostModal";
import ToolTip from "../../component/global/ToolTip";
const DashboardPost = () => {
  const {
    post,
    userInfo,
    setShowPostDetail,
    setEditPostDetail,
  } = React.useContext(GlobalDataContext);
  const removeArrowDropdownRef = React.useRef(null);
  const showPostModalRef = React.useRef(null);
  const editPostModalRef = React.useRef(null);
  const deletePostModalRef = React.useRef(null);
  React.useEffect(() => {
    console.log(removeArrowDropdownRef.current);
    if (removeArrowDropdownRef.current) {
      removeArrowDropdownRef.current.firstChild.classList.remove(
        "dropdown-toggle"
      );
      removeArrowDropdownRef.current.firstChild.classList.add("post-menu-btn");
      const menuBtn = document.querySelectorAll(".dropdown-toggle");
      menuBtn.forEach((item, i) => {
        item.classList.remove("dropdown-toggle");
        item.classList.add("post-menu-btn");
      });
    }
  }, [post]);
  // @TODO: show post modal
  const openShowPostModal = (post_detail) => {
    setShowPostDetail(post_detail);
    showPostModalRef.current.toggleModal();
  };

  // @TODO: open edit post modal
  const openEditPostModal = (_post_id, _post_content, _post_tag) => {
    setEditPostDetail({
      post_id: _post_id,
      post_content: _post_content,
      post_tag: JSON.parse(_post_tag),
    });
    editPostModalRef.current.toggleModal();
  };

  // @TODO: open delete post modal
  const openDeletePostModal = (post_id) => {
    deletePostModalRef.current.toggleModal(post_id);
  };
  // @TODO: iterate post;
  const dashboardPostList = () => {
    return post.map((item) => (
      <div className="post-card-wrapper border">
        <div className="post-header border-bottom py-1">
          <div className="post-created-by-wrapper me-1">
            <h6
              className="m-0 post-created-by"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <span className="fw-bold">
                <i className="bi bi-check-circle-fill text-primary"></i>&nbsp;
                {item.user_full_name}&nbsp;
              </span>
            </h6>
          </div>
          <div className="post-menu-btn-wrapper ms-1">
            <DropdownButton
              ref={removeArrowDropdownRef}
              drop="start"
              size="sm"
              menuVariant="dark"
              title={
                <span>
                  <i className="bi bi-three-dots-vertical"></i>
                </span>
              }
            >
              {userInfo.user_id === item.post_created_by ? (
                <Fragment>
                  <Dropdown.Header>
                    <span>
                      <i className="bi bi-gear"></i>
                    </span>
                    &nbsp;Post Options
                  </Dropdown.Header>
                  <Dropdown.Item
                    onClick={() =>
                      openEditPostModal(
                        item.post_id,
                        item.post_content,
                        item.post_tag
                      )
                    }
                  >
                    <span>
                      <i className="bi bi-pencil-square"></i>&nbsp;Edit
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => openDeletePostModal(item.post_id)}
                  >
                    <span>
                      <i className="bi bi-trash-fill"></i>&nbsp;Delete
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Divider></Dropdown.Divider>
                </Fragment>
              ) : (
                ""
              )}
              <Dropdown.Item>
                <span>
                  <i className="bi bi-share-fill"></i>&nbsp;Share Post URL
                </span>
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="post-date my-2">
          <span style={{ fontSize: ".8rem" }}>
            <i className="bi bi-clock"></i>&nbsp;
            {formatDistanceToNow(new Date(item.post_created_at), {
              addSuffix: true,
            })}
            &nbsp;
            {new Date(item.post_created_at) < new Date(item.post_updated_at) ? (
              <span>
                <i className="bi bi-dot"></i>
                Edited
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="post-tag-wrapper d-flex align-items-center flex-wrap">
          {JSON.parse(item.post_tag).map((tag_item) => (
            <Badge className="mx-1 my-1" size="sm" bg="dark" key={tag_item.seq}>
              {tag_item.tag_text}
            </Badge>
          ))}
        </div>
        <div className="post-body-wrapper">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: item.post_content }}
          ></div>
        </div>
        <div className="post-content-fade-wrapper"></div>
        <div className="post-footer border-top">
          <div className="w-100 d-flex justify-content-center">
            <ToolTip placement="top" text="Like">
              <button className="w-100 std-btn-style std-black p-1 post-footer-btn">
                <span style={{ fontSize: "1.1rem" }}>
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </span>
              </button>
            </ToolTip>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <ToolTip placement="top" text="Dislike">
              <button className="w-100 std-btn-style std-black p-1 post-footer-btn">
                <span style={{ fontSize: "1.1rem" }}>
                  <i className="bi bi-hand-thumbs-down-fill"></i>
                </span>
              </button>
            </ToolTip>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <ToolTip placement="top" text="Comments">
              <button className="w-100 std-btn-style std-black p-1 post-footer-btn">
                <span style={{ fontSize: "1.1rem" }}>
                  <i className="bi bi-chat-fill"></i>
                </span>
              </button>
            </ToolTip>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <ToolTip placement="top" text="View Post">
              <button
                className="w-100 std-btn-style std-black p-1 post-footer-btn"
                onClick={() => openShowPostModal(item)}
              >
                <span style={{ fontSize: "1.1rem" }}>
                  <i className="bi bi-box-arrow-up-right"></i>
                </span>
              </button>
            </ToolTip>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Fragment>
      <ShowPostModal ref={showPostModalRef} />
      <EditPostModal ref={editPostModalRef} />
      <DeletePostModal ref={deletePostModalRef} />
      {dashboardPostList()}
    </Fragment>
  );
};

export default DashboardPost;
