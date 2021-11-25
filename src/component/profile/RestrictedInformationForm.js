/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { useFetch } from "api/useFetch";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import ToolTip from "component/global/ToolTip";
import SpinnerLoad from "component/global/SpinnerLoad";
const RestrictedInformationForm = () => {
  const { setGlobalMessage, useNotify, userInfo, setPostReloader, postReloader } = React.useContext(
    GlobalDataContext
  );
  const [agreeChanges, setAgreeChanges] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [textInputChecker, setTextInputChecker] = React.useState({
    new_password: "",
    confirm_new_password: "",
    newPasswordValid: false,
    confirmNewPasswordValid: false,
  });
  const currentPassInputRef = React.useRef(null);
  const newPassInputRef = React.useRef(null);
  const confirmNewPassInputRef = React.useRef(null);
  const changePasswordBtnSpinLoadRef = React.useRef(null);

  // @TODO: send restricted info
  const submitRestrcitedInfo = (e) => {
    e.preventDefault();
    changePasswordBtnSpinLoadRef.current.toggleSpinner();
    const params = {
      current_password: currentPassInputRef.current.value,
      new_password: newPassInputRef.current.value,
      confirm_new_password: confirmNewPassInputRef.current.value,
      user_id: userInfo.user_id,
    };
    useFetch(params, "PUT", "change-password", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPostReloader(!postReloader);
            currentPassInputRef.current.value = "";
            newPassInputRef.current.value = "";
            confirmNewPassInputRef.current.value = "";
            changePasswordBtnSpinLoadRef.current.toggleSpinner();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            changePasswordBtnSpinLoadRef.current.toggleSpinner();
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
      <div className="my-3">
        <h6
          className="bg-danger text-white px-2 py-2"
          style={{ borderRadius: ".2rem" }}
        >
          <span>
            <i className="bi bi-exclamation-circle-fill"></i>&nbsp;Reset
            Password
          </span>
        </h6>
        <Form onSubmit={(e) => submitRestrcitedInfo(e)}>
          <Form.Group className="my-3" controlId="inputCurrentPassword">
            <FloatingLabel
              controlId="labelCurrentPassword"
              label={
                <span className="text-primary">
                  <i className="bi bi-shield-lock-fill"></i>&nbsp;Current
                  Password
                </span>
              }
            >
              <Form.Control
                className="fw-bold"
                type={showPassword ? "text" : "password"}
                placeholder="Current Password"
                ref={currentPassInputRef}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="my-3" controlId="inputNewPassword">
            <FloatingLabel
              controlId="labelNewPassword"
              label={
                <span className="text-primary">
                  <i className="bi bi-shield-lock-fill"></i>&nbsp;New Password
                </span>
              }
            >
              <Form.Control
                onInput={(e) => {
                  if (newPassInputRef.current.value.length < 6) {
                    setTextInputChecker({
                      ...textInputChecker,
                      new_password: "Password should atleast 6 characters long",
                      newPasswordValid: false,
                    });
                  } else {
                    setTextInputChecker({
                      ...textInputChecker,
                      new_password: "",
                      newPasswordValid: false,
                    });
                  }
                }}
                className="fw-bold"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                ref={newPassInputRef}
              />
            </FloatingLabel>
            <Form.Text
              style={{ fontSize: ".8rem" }}
              className={
                textInputChecker.newPasswordValid
                  ? "text-primary fw-bold"
                  : "text-danger fw-bold"
              }
            >
              {textInputChecker.new_password}
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-3" controlId="inputConfirmNewPassword">
            <FloatingLabel
              controlId="labelConfirmNewPassword"
              label={
                <span className="text-primary">
                  <i className="bi bi-shield-lock-fill"></i>&nbsp;Confirm New
                  Password
                </span>
              }
            >
              <Form.Control
                onInput={() => {
                  if (
                    confirmNewPassInputRef.current.value !==
                    newPassInputRef.current.value
                  ) {
                    setTextInputChecker({
                      ...textInputChecker,
                      confirm_new_password: "Password don't matched",
                      confirmNewPasswordValid: false,
                    });
                  } else {
                    setTextInputChecker({
                      ...textInputChecker,
                      confirm_new_password: "",
                      confirmNewPasswordValid: false,
                    });
                  }
                }}
                className="fw-bold"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                ref={confirmNewPassInputRef}
              />
            </FloatingLabel>
            <Form.Text
              style={{ fontSize: ".8rem" }}
              className={
                textInputChecker.confirmPasswordValid
                  ? "text-primary fw-bold"
                  : "text-danger fw-bold"
              }
            >
              {textInputChecker.confirm_new_password}
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="d-flex align-items-center justify-content-between"
            controlId="agreeChangePassword"
          >
            <Form.Check
              onChange={() => setAgreeChanges(!agreeChanges)}
              label="I accept all the changes."
            ></Form.Check>
            <ToolTip placement="top" text="Show Password">
              <Button
                size="sm"
                variant="light"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span>
                  <i className="bi bi-eye"></i>
                </span>
              </Button>
            </ToolTip>
          </Form.Group>
          {agreeChanges ? (
            <div className="my-3 d-flex align-items-center justify-content-end">
              <Form.Group controlId="submitRestrictedInfoBtn">
                <Button size="sm" variant="success" type="submit">
                  Change Password&nbsp;
                  <SpinnerLoad
                    animation="border"
                    size="sm"
                    ref={changePasswordBtnSpinLoadRef}
                  />
                </Button>
              </Form.Group>
            </div>
          ) : (
            ""
          )}
        </Form>
      </div>
    </Fragment>
  );
};
export default RestrictedInformationForm;
