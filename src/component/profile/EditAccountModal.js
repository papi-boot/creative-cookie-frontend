/* eslint-disable react-hooks/rules-of-hooks */

import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import EditInformationTab from "./EditInformationTab";
const EditAccountModal = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false);
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShow(!show);
    },
  }));

  return (
    <Fragment>
      <Modal
        show={show}
        onHide={close}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="m-0">
              <span>
                <i className="bi bi-gear-fill"></i>&nbsp;Edit Information
              </span>
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditInformationTab close={close} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
});
export default EditAccountModal;
