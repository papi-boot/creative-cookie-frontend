import React, { Fragment } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
const ToolTip = (props) => {
  return (
    <Fragment>
      <OverlayTrigger
        placement={props.placement}
        overlay={<Tooltip>{props.text}</Tooltip>}
      >
        {props.children}
      </OverlayTrigger>
    </Fragment>
  );
};

export default ToolTip;
