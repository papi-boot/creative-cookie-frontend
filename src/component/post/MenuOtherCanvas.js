import React, { Fragment } from "react";
import { Offcanvas } from "react-bootstrap";
import MenuOtherTab from "component/menu-other/MenuOtherTab";
const MenuOtherCanvas = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false);
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleCanvas(postItem) {
      setShow(!show);
    },
  }));
  return (
    <Fragment>
      <Offcanvas show={show} onHide={close} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h5 className="m-0">
              <span>
                <i className="bi bi-reply-fill"></i>&nbsp;Others
              </span>
            </h5>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MenuOtherTab />
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
});

export default MenuOtherCanvas;
