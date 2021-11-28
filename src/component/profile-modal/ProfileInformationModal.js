import React, { Fragment } from "react";
import { Modal } from "react-bootstrap";
import ProfileInformationTab from "./ProfileInformationTab";
const ProfileInformationModal = React.forwardRef((props, ref) => {
  const [show, setShow] = React.useState(false);
  const [user, setUser] = React.useState({});
  const close = () => setShow(!show);
  React.useImperativeHandle(ref, () => ({
    toggleModal(_user) {
      setShow(!show);
      setUser(_user);
    },
  }));
  return (
    <Fragment>
      <Modal show={show} onHide={close} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="m-0 fw-bold">Profile</h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileInformationTab user={user} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
});

export default ProfileInformationModal;
