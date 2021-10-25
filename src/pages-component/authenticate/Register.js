import React, { Fragment } from "react";
import { GlobalDataContext } from "../../context/GlobalData";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import SpinnerLoad from "../../component/global/SpinnerLoad";
const Register = () => {
  const spinnerLoadRef = React.useRef(null);
  return (
    <Fragment>
      <Form>
        <Form.Group controlId="regInputFullname">
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-black-50">
                <i className="bi bi-person-fill"></i>&nbsp; Full Name
              </span>
            }
          >
            <Form.Control
              required
              type="text"
              className="fw-bold"
              placeholder="Full Name"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="regInputEmail">
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-black-50">
                <i className="bi bi-at"></i>&nbsp; Email Address
              </span>
            }
          >
            <Form.Control
              required
              type="email"
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="regInputPassword">
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-black-50">
                <i className="bi bi-shield-lock-fill"></i>&nbsp; Password
              </span>
            }
          >
            <Form.Control
              required
              type="password"
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="regInputConfirmPasswords">
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-black-50">
                <i className="bi bi-shield-lock-fill"></i>&nbsp; Confirm
                Password
              </span>
            }
          >
            <Form.Control
              required
              type="password"
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-end">
          <Button className="fw-bold" size="sm" variant="primary" onClick={() => spinnerLoadRef.current.toggleSpinner()}>
            Register&nbsp;
            <span>
              <SpinnerLoad animation="grow" size="sm" ref={spinnerLoadRef} />
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Register;
