import React, { Fragment } from "react";
import { Tabs, Tab } from "react-bootstrap";
import BasicInformationForm from "./BasicInformationForm";
import RestrictedInformationForm from "./RestrictedInformationForm";
import ToolTip from "component/global/ToolTip";
const EditInformationTab = ({close}) => {
  const [currentTab, setCurrentTab] = React.useState("basic-info");

  return (
    <Fragment>
      <Tabs activeKey={currentTab} onSelect={(key) => setCurrentTab(key)}>
        <Tab
          eventKey="basic-info"
          title={
            <ToolTip placement="top" text="Basic Information">
              <span>
                <i className="bi bi-card-text"></i>
              </span>
            </ToolTip>
          }
        >
          <BasicInformationForm close={close} />
        </Tab>
        <Tab
          eventKey="resrict-info"
          title={
            <ToolTip placement="top" text="Restricted Information">
              <span>
                <i className="bi bi-shield-lock-fill"></i>
              </span>
            </ToolTip>
          }
        >
          <RestrictedInformationForm />
        </Tab>
      </Tabs>
    </Fragment>
  );
};
export default EditInformationTab;
