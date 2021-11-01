import React, { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";
import { GlobalDataContext } from "../../context/GlobalData";
const ShowPostTabs = () => {
  const { showPostDetail } = React.useContext(GlobalDataContext);
  const [currentTab, setCurrentTab] = React.useState("post-thread");
  const style = {
    fontSize: "1rem",
  };
  return (
    <Fragment>
      <Tab.Container
        defaultActiveKey={currentTab}
        onSelect={(key) => setCurrentTab(key)}
      >
        <Nav
          variant="pills"
          className="position-fixed d-flex align-item-center justify-content-center py-1 border-bottom"
          style={{ backgroundColor: "#fff", top: "4rem", width: "100%" }}
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
              <span>
                <i className="bi bi-chat-fill"></i>
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="like">
              <span>
                <i className="bi bi-hand-thumbs-up-fill"></i>
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dislike">
              <span>
                <i className="bi bi-hand-thumbs-down-fill"></i>
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-5">
          <Tab.Pane eventKey="post-thread" className="p-2">
            <div
              className="show-post-content"
              dangerouslySetInnerHTML={{ __html: showPostDetail.post_content }}
            ></div>
          </Tab.Pane>
          <Tab.Pane eventKey="comment"></Tab.Pane>
          <Tab.Pane eventKey="like"></Tab.Pane>
          <Tab.Pane eventKey="dislike"></Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
};
export default ShowPostTabs;
