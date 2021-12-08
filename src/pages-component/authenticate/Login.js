/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { GlobalDataContext } from "context/GlobalData";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { useSocket } from "api/useSocket";
import { useHistory } from "react-router-dom";
import SpinnerLoad from "component/global/SpinnerLoad";
import ToolTip from "component/global/ToolTip";
import ForgotPasswordModal from "component/authenticate/ForgotPasswordModal";
const Login = () => {
  const {
    userEmail,
    useNotify,
    setGlobalMessage,
    setIsAuthenticated,
    setDataReloader,
    setUserInfo,
    dataReloader,
    splashScreenRef,
  } = React.useContext(GlobalDataContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const history = useHistory();
  const logSpinnerLoadRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const forgotPasswordModalRef = React.useRef(null);
  const sendLoginRequest = (e) => {
    splashScreenRef.current.classList.remove("d-none");
    logSpinnerLoadRef.current.toggleSpinner();
    e.preventDefault();
    const params = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    useFetch(params, "POST", "login", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            useSocket().emit("user login", "user login");
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setUserInfo(res.user);
            setIsAuthenticated(res.isAuthenticated);
            resetForm();
            setDataReloader(!dataReloader);
            logSpinnerLoadRef.current.toggleSpinner();
            history.replace("/dashboard");
          } else {
            logSpinnerLoadRef.current.toggleSpinner();
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            setIsAuthenticated(res.isAuthenticated);
            setDataReloader(!dataReloader);
          }
        } else {
          logSpinnerLoadRef.current.toggleSpinner();
          throw new Error(
            "Somethign went wrong. Plase try again or check your network."
          );
        }
      })
      .catch((err) => {
        setGlobalMessage(err.mesasage);
        useNotify(err.message, "error");
      });
  };

  const resetForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  return (
    <Fragment>
      <ForgotPasswordModal ref={forgotPasswordModalRef} />
      <Form onSubmit={(e) => sendLoginRequest(e)}>
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
              id="hello"
              ref={emailRef}
              type="email"
              className="fw-bold hello"
              defaultValue={userEmail}
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
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              className="fw-bold"
              placeholder="Email Address"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-between">
          <ToolTip placement="top" text="Show Password">
            <Button
              className="fw-bold"
              size="sm"
              variant="light"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span>
                <i className="bi bi-eye"></i>
              </span>
            </Button>
          </ToolTip>
          <Button size="sm" className="fw-bold" variant="primary" type="submit">
            Login
            <SpinnerLoad animation="grow" size="sm" ref={logSpinnerLoadRef} />
          </Button>
        </div>
      </Form>
      <div className="d-flex align-items-center justify-content-center my-3">
        <a
          href="#fp"
          role="button"
          onClick={() => forgotPasswordModalRef.current.toggleModal()}
        >
          Forgot password?
        </a>
      </div>
    </Fragment>
  );
};

export default Login;
