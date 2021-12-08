/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FloatingLabel, Spinner, Form, Button } from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { useQuery } from "api/useQuery";
import { GlobalDataContext } from "context/GlobalData";
import SpinnerLoad from "component/global/SpinnerLoad";
import creativecookie from "assets/logo/creativecookie.png";
const ResetPasswordForm = () => {
  let query = useQuery();
  const { setGlobalMessage, useNotify } = React.useContext(GlobalDataContext);
  const [isPasswordResetFetching, setIsPasswordResetFetching] = React.useState(
    true
  );
  const [recoveryEmail, setRecoveryEmail] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isPasswordResetGood, setIsPasswordResetGood] = React.useState(false);
  const [passwordToggle, setPasswordToggle] = React.useState(false);
  const resetPassSpinLoadRef = React.useRef(null);
  const newPasswordRef = React.useRef(null);
  const confirmNewPasswordRef = React.useRef(null);

  React.useEffect(() => {
    useFetch(
      { token: query.get("t") },
      "POST",
      "read-reset-password",
      setGlobalMessage,
      useNotify
    )
      .then((res) => {
        if (res) {
          if (res.success) {
            setIsPasswordResetFetching(!isPasswordResetFetching);
            setRecoveryEmail(res.password_reset_email_ref);
            setIsPasswordResetGood(res.success);
          } else {
            setIsPasswordResetFetching(!isPasswordResetFetching);
            setErrorMessage(res.message);
            setIsPasswordResetGood(res.success);
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  }, []);

  // @TODO handle reset password confirmation
  const sendResetPasswordConfirmationRequest = () => {
    resetPassSpinLoadRef.current.toggleSpinner();
    const params = {
      token: query.get("t"),
      new_password: newPasswordRef.current.value,
      confirm_new_password: confirmNewPasswordRef.current.value
    }
    useFetch(params, "PUT", "reset-password")
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            resetPassSpinLoadRef.current.toggleSpinner();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            resetPassSpinLoadRef.current.toggleSpinner();
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  };
  return (
    <Fragment>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className="border reset-password-wrapper d-flex align-items-center justify-content-center flex-column p-3"
          style={{ borderRadius: ".3rem" }}
        >
          <div className="logo mb-3">
            <img
              style={{ width: "8rem" }}
              src={creativecookie}
              alt="Creative Cookie Studio"
              loading="lazy"
            />
          </div>
          {isPasswordResetFetching ? (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <div>
                <Spinner animation="grow" size="sm" />
                &nbsp;
                <Spinner animation="grow" size="sm" />
                &nbsp;
                <Spinner animation="grow" size="sm" />
                &nbsp;
              </div>
              <h6>Verifying request...</h6>
            </div>
          ) : (
            <div>
              {isPasswordResetGood ? (
                <div>
                  <h6 className="my-3 text-center">
                    Reset password for
                    <br />
                    <strong>{recoveryEmail}</strong>
                  </h6>
                  <Form.Group controlId="inputNewPassword">
                    <FloatingLabel
                      className="mb-3"
                      label={
                        <span className="text-primary">
                          <i className="bi bi-shield-lock-fill"></i>&nbsp;Enter
                          new password
                        </span>
                      }
                    >
                      <Form.Control
                        ref={newPasswordRef}
                        placeholder="Enter New Password"
                        type={passwordToggle ? "text" : "password"}
                        name="newPassword"
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group controlId="inputConfirmNewPassword">
                    <FloatingLabel
                      className="mb-3"
                      label={
                        <span className="text-primary">
                          <i className="bi bi-shield-lock-fill"></i>
                          &nbsp;Confirm New Password
                        </span>
                      }
                    >
                      <Form.Control
                        ref={confirmNewPasswordRef}
                        placeholder="Confirm New Password"
                        type={passwordToggle ? "text" : "password"}
                        name="confirmNewPassword"
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <div className="d-flex align-items-center justify-content-between">
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setPasswordToggle(!passwordToggle)}
                    >
                      <span>
                        <i className="bi bi-eye"></i>
                      </span>
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => sendResetPasswordConfirmationRequest()}
                    >
                      Reset Password&nbsp;
                      <SpinnerLoad
                        animation="grow"
                        size="sm"
                        ref={resetPassSpinLoadRef}
                      />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h6 className="text-danger text-center">{errorMessage}</h6>
                </div>
              )}
            </div>
          )}
          <Link
            className="my-3"
            onClick={() => localStorage.setItem("URL", "/authenticate")}
            to="/authenticate"
          >
            Login instead
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPasswordForm;
