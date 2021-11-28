import React, { Fragment } from "react";
import { Tab, Tabs } from "react-bootstrap";
import UserProfile from "./UserProfile";
const ProfileInformationTab = ({ user }) => {
  const [currentTab, setCurrentTab] = React.useState("user-profile");
  return (
    <Fragment>
      <Tabs activeKey={currentTab} onSelect={(key) => setCurrentTab(key)}>
        <Tab
          eventKey="user-profile"
          title={
            <span>
              <i className="bi bi-person-fill"></i>&nbsp;Profile
            </span>
          }
        >
          <UserProfile user={user} />
        </Tab>
        <Tab
          eventKey="user-post"
          title={
            <span>
              <i className="bi bi-card-text"></i>&nbsp;Post
            </span>
          }
        ></Tab>
      </Tabs>
    </Fragment>
  );
};

export default ProfileInformationTab;
