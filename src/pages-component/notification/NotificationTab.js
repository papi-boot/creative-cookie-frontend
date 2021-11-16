import React, { Fragment } from "react";
import { Tab, Nav } from "react-bootstrap";
import NotifAllList from "component/notification/NotifAllList";
const NotificationPage = () => {
  const [currentTab, setCurrentTab] = React.useState("All");
  const style = {
    fontSize: ".9rem",
  };
  return (
    <Fragment>
      <Tab.Container
        defaultActiveKey={currentTab}
        onSelect={(key) => {
          setCurrentTab(key);
        }}
      >
        <div className="row">
          <div className="col-lg-2">
            <Nav
              variant="pills"
              className="d-flex flex-md-column justify-content-center position-fixed notif-nav"
            >
              <Nav.Item>
                <Nav.Link className="notif-active py-1 px-3" eventKey="All">
                  <span style={style}>All</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="notif-active p-1 px-3" eventKey="Comment">
                  <span style={style}>Comment</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="notif-active p-1 px-3" eventKey="Like">
                  <span style={style}>Like</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="col-lg-10">
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <section className="notif-all-pane">
                  <NotifAllList />
                </section>
              </Tab.Pane>
              <Tab.Pane eventKey="Comment"></Tab.Pane>
              <Tab.Pane eventKey="Like"></Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </Fragment>
  );
};
export default NotificationPage;
