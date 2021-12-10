/* eslint-disable react-hooks/rules-of-hooks */

import React, { Fragment } from "react";
import {
  Modal,
  FloatingLabel,
  Form,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import SpinnerLoad from "component/global/SpinnerLoad";
const ForgotPasswordModal = React.forwardRef((props, ref) => {
  const { useNotify, setGlobalMessage } = React.useContext(GlobalDataContext);
  const [show, setShow] = React.useState(false);
  const close = () => setShow(!show);
  const resetPassSpinnerLoadRef = React.useRef(null);
  const emailRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    toggleModal() {
      setShow(!show);
    },
  }));
  // @TODO handle reset password request
  const sendResetPasswordRequest = () => {
    resetPassSpinnerLoadRef.current.toggleSpinner();
    const params = {
      email: emailRef.current.value,
    };
    useFetch(params, "POST", "reset-password", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            resetPassSpinnerLoadRef.current.toggleSpinner();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            resetPassSpinnerLoadRef.current.toggleSpinner();
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
        resetPassSpinnerLoadRef.current.toggleSpinner();
      });
  };

  return (
    <Fragment>
      <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="m-0">
              <span>
                <i className="bi bi-info-circle-fill"></i>&nbsp;Reset Password
              </span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-primary">
                <i className="bi bi-at"></i>&nbsp;Email Address
              </span>
            }
          >
            <Form.Control
              ref={emailRef}
              className="fw-bold"
              type="email"
              placeholder="Email Address"
              name="emailAddress"
              id="emailAddress"
            />
          </FloatingLabel>
          <div className="d-flex align-items-center justify-content-between">
            <Button
              size="sm"
              variant="success"
              onClick={() => sendResetPasswordRequest()}
            >
              Reset Password&nbsp;
              <span>
                <SpinnerLoad
                  animation="grow"
                  size="sm"
                  ref={resetPassSpinnerLoadRef}
                />
              </span>
            </Button>
            <OverlayTrigger
              trigger="hover"
              placement="bottom"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Header as="h6" className="fw-bold">
                    Where is the Request for Password Reset?
                  </Popover.Header>
                  <Popover.Body>
                    Please check all the tabs on your email provider such
                    as&nbsp;
                    <span className="fw-bold">Primary</span>,&nbsp;
                    <span className="fw-bold">Social</span>,&nbsp;
                    <span className="fw-bold">Promotions</span>,&nbsp;
                    <span className="fw-bold">Spam</span>
                  </Popover.Body>
                </Popover>
              }
            >
              <span className="text-primary">
                <i className="bi bi-question-circle-fill"></i>
              </span>
            </OverlayTrigger>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </Fragment>
  );
});

export default ForgotPasswordModal;
