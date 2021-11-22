import React, { Fragment } from "react";
import { Nav, Tab, Container, Spinner } from "react-bootstrap";
import { useQuery } from "api/useQuery";
import PostContentArticle from "component/post-content/PostContentArticle";
import PostContentComment from "component/post-content/PostContentComment";
import PostContentLike from "component/post-content/PostContentLike";
const PostContentTab = ({ onePostDetail }) => {
  let query = useQuery();
  const [currentTab, setCurrentTab] = React.useState(query.get("ct"));
  return (
    <Fragment>
      <Tab.Container
        defaultActiveKey={currentTab}
        onSelect={(key) => setCurrentTab(key)}
      >
        <div className="row">
          <div className="col-12">
            <Container>
              <section
                className="post-content-nav-wrapper d-flex align-items-center justify-content-center position-fixed w-100"
                style={{ left: "0", right: "0", zIndex: "2" }}
              >
                <Nav variant="pills" className="">
                  <Nav.Item>
                    <Nav.Link
                      className="post-content-active py-1 px-3 mx-1"
                      eventKey="Post"
                    >
                      <span>
                        <i className="bi bi-card-text"></i>
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="post-content-active p-1 px-3 mx-1"
                      eventKey="Like"
                    >
                      <span className="fw-bold">
                        <i className="bi bi-hand-thumbs-up-fill"></i>&nbsp;
                        {onePostDetail.post_like ? (
                          onePostDetail.post_like.length
                        ) : (
                          <Spinner animation="grow" size="sm" />
                        )}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className="post-content-active p-1 px-3 mx-1"
                      eventKey="Comment"
                    >
                      <span className="fw-bold">
                        <i className="bi bi-chat-fill"></i>&nbsp;
                        {onePostDetail.post_comment ? (
                          onePostDetail.post_comment.length
                        ) : (
                          <Spinner animation="grow" size="sm" />
                        )}
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </section>
            </Container>
          </div>
          <div className="col-12 g-0">
            <section className="post-content-pane">
              <Tab.Content>
                <Tab.Pane eventKey="Post">
                  <PostContentArticle onePostDetail={onePostDetail} />
                </Tab.Pane>
                <Tab.Pane eventKey="Like">
                  <PostContentLike onePostDetail={onePostDetail} />
                </Tab.Pane>
                <Tab.Pane eventKey="Comment">
                  <div className="post-content-comment-wrapper">
                    <PostContentComment onePostDetail={onePostDetail} />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </section>
          </div>
        </div>
      </Tab.Container>
    </Fragment>
  );
};
export default PostContentTab;
