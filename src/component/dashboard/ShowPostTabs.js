import React, { Fragment } from "react";
import { Tab, Nav, Container } from "react-bootstrap";
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
              <span>
                <i className="bi bi-chat-fill"></i>
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="like">
              <span>
                <i className="bi bi-hand-thumbs-up-fill"></i>&nbsp;
                {showPostDetail.post_like.length}
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-5">
          <Tab.Pane eventKey="post-thread" className="py-2">
            <Container>
              <div
                className="show-post-content"
                dangerouslySetInnerHTML={{
                  __html: showPostDetail.post.post_content,
                }}
              ></div>
            </Container>
          </Tab.Pane>
          <Tab.Pane eventKey="comment"></Tab.Pane>
          <Tab.Pane eventKey="like" className="py-3">
            <Container>
              {showPostDetail.post_like.map((item) => (
                <div className="row my-2">
                  <div className="col-lg-4" key={item.plr_id}></div>
                  <div key={item.plr_id} className="col-lg-4">
                    <span className="fw-bold">
                      <i className="bi bi-check-circle-fill text-primary"></i>
                      &nbsp;
                      {item.user_full_name}
                    </span>
                  </div>
                  <div className="col-lg-4" key={item.plr_id}></div>
                </div>
              ))}
            </Container>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
};
export default ShowPostTabs;
