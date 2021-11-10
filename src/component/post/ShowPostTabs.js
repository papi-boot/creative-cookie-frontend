import React, { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
import PostContentTab from "./PostContentTab";
import LikeTab from "./LikeTab";
import CommentTab from "./CommentTab";
const ShowPostTabs = () => {
  const { showPostDetail } = React.useContext(GlobalDataContext);
  const [currentTab, setCurrentTab] = React.useState("post-thread");

  return (
    <Fragment>
      <Tab.Container
        defaultActiveKey={currentTab}
        onSelect={(key) => {
          setCurrentTab(key);
        }}
      >
        <Nav
          variant="pills"
          className="position-fixed d-flex align-item-center justify-content-center py-1 border-bottom"
          style={{
            backgroundColor: "#fff",
            top: "4rem",
            width: "100%",
            zIndex: "1",
          }}
        >
          <Nav.Item>
            <Nav.Link eventKey="post-thread">
              <span>
                <i className="bi bi-card-text"></i>
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="comment">
              <span className="fw-bold">
                <i className="bi bi-chat-fill"></i>&nbsp;
                {showPostDetail.post_comment.length}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="like">
              <span className="fw-bold">
                <i className="bi bi-hand-thumbs-up-fill"></i>&nbsp;
                {showPostDetail.post_like.length}
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-5">
          <Tab.Pane eventKey="post-thread" className="py-2">
            <PostContentTab />
          </Tab.Pane>
          <Tab.Pane eventKey="comment" style={{ overflow: "hidden" }}>
            <CommentTab />
          </Tab.Pane>
          <Tab.Pane eventKey="like" className="py-3">
            <LikeTab />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
};
export default ShowPostTabs;
