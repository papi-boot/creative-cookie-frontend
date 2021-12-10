import React, { Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap";
import MenuShareList from "./MenuShareList";
const MenuOtherTab = ({postDetail}) => {
  const [currentTab, setCurrentTab] = React.useState("Share");
  return (
    <Fragment>
      <Tabs activeKey={currentTab} onSelect={(key) => setCurrentTab(key)}>
        <Tab
          eventKey="Share"
          title={
            <span className="fw-bold">
              <i className="bi bi-share-fill"></i>&nbsp;Share
            </span>
          }
        >
          <MenuShareList />
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default MenuOtherTab;
