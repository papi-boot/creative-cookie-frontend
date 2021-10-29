/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { GlobalDataContext } from "../../context/GlobalData";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useFetch } from "../../api/useFetch";
import SpinnerLoad from "../../component/global/SpinnerLoad";
import ToolTip from "../../component/global/ToolTip";
const Register = () => {
  const {
    setUserEmail,
    useNotify,
    setGlobalMessage,
    setAuthenticateTab,
    setDataReloader,
    dataReloader,
  } = React.useContext(GlobalDataContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const spinnerLoadRef = React.useRef(null);
  const fullNameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);

  const sendRegisterSubmit = (e) => {
    e.preventDefault();
    spinnerLoadRef.current.toggleSpinner();
    const params = {
      fullname: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirm_password: confirmPasswordRef.current.value,
    };
    useFetch(params, "POST", "register", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            useNotify(res.message, "success");
            setGlobalMessage(res.message);
            setUserEmail(res.user);
            setAuthenticateTab("Login");
            setDataReloader(!dataReloader);
            spinnerLoadRef.current.toggleSpinner();
            resetForm();
          } else {
            useNotify(res.message, "error");
            setGlobalMessage(res.message);
            spinnerLoadRef.current.toggleSpinner();
          }
        } else {
          throw new Error(
            "Somethign went wrong. Plase try again or check your network."
          );
        }
      })
      .catch((err) => {
        useNotify(err.message, "error");
        setGlobalMessage(err.message);
        spinnerLoadRef.current.toggleSpinner();
      });
  };
  const resetForm = () => {
    fullNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };
  return (
    <Fragment>
      <Form onSubmit={(e) => sendRegisterSubmit(e)}>
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
              ref={fullNameRef}
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
              ref={emailRef}
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
              ref={passwordRef}
              required
              type={showPassword ? "text" : "password"}
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
              ref={confirmPasswordRef}
              required
              type={showPassword ? "text" : "password"}
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-between">
          <ToolTip placement="top" text="Show Password">
            <Button className="fw-bold" size="sm" variant="light" onClick={() => setShowPassword(!showPassword)}>
              <span>
                <i className="bi bi-eye"></i>
              </span>
            </Button>
          </ToolTip>
          <Button className="fw-bold" size="sm" variant="primary" type="submit">
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
