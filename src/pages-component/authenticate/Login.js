import React, { Fragment } from "react";
import { GlobalDataContext } from "../../context/GlobalData";
import { Form, FloatingLabel } from "react-bootstrap";
const Login = () => {
  return (
    <Fragment>
      <Form>
        <Form.Group controlId="logInputEmail">
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-primary">
                <i className="bi bi-at"></i>&nbsp; Email Address
              </span>
            }
          >
            <Form.Control
              type="email"
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="logInputPassword">
          <FloatingLabel
            className="mb-3"
            label={
              <span className="fw-bold text-primary">
                <i className="bi bi-shield-lock-fill"></i>&nbsp; Password
              </span>
            }
          >
            <Form.Control
              type="password"
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default Login;
