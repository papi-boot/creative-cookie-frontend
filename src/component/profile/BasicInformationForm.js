/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { useFetch } from "api/useFetch";
import { Form, FloatingLabel, Button, Badge } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
import { v4 as uuidV4 } from "uuid";
import SpinnerLoad from "component/global/SpinnerLoad";
const BasicInformationForm = ({close}) => {
  const { userInfo, useNotify, setGlobalMessage, postReloader, setPostReloader } = React.useContext(
    GlobalDataContext
  );
  const [emailChecker, setEmailChecker] = React.useState({
    text: "",
    isValid: true,
  });
  const [socialLinkRecord, setSocialLinkRecord] = React.useState(
    userInfo.prof_info_social_link ? JSON.parse(userInfo.prof_info_social_link) : []
  );
  const [agreeChanges, setAgreeChanges] = React.useState(false);
  const inputDisplayTextRef = React.useRef(null);
  const inputLinkAddressRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const fullNameInputRef = React.useRef(null);
  const aboutMeInputRef = React.useRef(null);
  const editInfoSpinnerLoadRef = React.useRef(null);

  // @TODO: add social link
  const addSocialLink = () => {
    setSocialLinkRecord([
      ...socialLinkRecord,
      {
        key: uuidV4(),
        display_text: inputDisplayTextRef.current.value,
        link_address: inputLinkAddressRef.current.value,
      },
    ]);
    inputDisplayTextRef.current.value = "";
    inputLinkAddressRef.current.value = "";
  };

  // @TODO: remove social links
  const removeSocialLink = (item) => {
    const filterSocialLink = socialLinkRecord.filter(
      (itemRecord) => itemRecord.key !== item.key
    );
    return setSocialLinkRecord(filterSocialLink);
  };

  // @TODO: check email address on input
  const sendEmailValidator = () => {
    if (userInfo.user_email !== emailInputRef.current.value) {
      const params = {
        user_email: emailInputRef.current.value,
      };
      useFetch(params, "POST", "email-validate", setGlobalMessage, useNotify)
        .then((res) => {
          if (res) {
            if (res.success) {
              setEmailChecker({ text: res.message, isValid: res.success });
            } else {
              setEmailChecker({ text: res.message, isValid: res.success });
            }
          } else {
            throw new Error("Something went wrong. Please try again or later");
          }
        })
        .catch((err) => {
          setGlobalMessage(err.message);
          useNotify(err.message, "error");
        });
    } else {
      if (userInfo.user_email === emailInputRef.current.value) {
        setEmailChecker({ text: "", isValid: true });
      }
    }
  };

  // @TODO: submit edit profile
  const submitEditProfileInformation = (e) => {
    e.preventDefault();
    editInfoSpinnerLoadRef.current.toggleSpinner();
    const params = {
      updated_user_email: emailInputRef.current.value,
      updated_user_full_name: fullNameInputRef.current.value,
      updated_about_me: aboutMeInputRef.current.value,
      updated_social_link: socialLinkRecord,
    };
    useFetch(params, "PUT", "profile", setGlobalMessage, useNotify)
      .then((res) => {
        if (res.success) {
          setGlobalMessage(res.message);
          useNotify(res.message, "success");
          editInfoSpinnerLoadRef.current.toggleSpinner();
          setPostReloader(!postReloader);
          close();
        } else {
          setGlobalMessage(res.message);
          useNotify(res.message, "error");
          editInfoSpinnerLoadRef.current.toggleSpinner();
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
        editInfoSpinnerLoadRef.current.toggleSpinner();
      });
  };
  return (
    <Fragment>
      <div className="my-3">
        <h6 style={{ fontSize: "0.8rem" }}>
          Account ID:&nbsp;{userInfo.user_id}
        </h6>
        <Form
          className="form-edit-account"
          onSubmit={(e) => submitEditProfileInformation(e)}
        >
          <Form.Group className="my-3" controlId="inputFullname">
            <FloatingLabel
              controlId="labelFullname"
              label={
                <span className="text-primary">
                  <i className="bi bi-person-fill"></i>&nbsp;Full Name
                </span>
              }
            >
              <Form.Control
                ref={fullNameInputRef}
                className="fw-bold"
                type="text"
                placeholder="Full Name"
                defaultValue={userInfo.user_full_name}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="my-3" controlId="inputEmail">
            <FloatingLabel
              controlId="labelEmail"
              label={
                <span className="text-primary">
                  <i className="bi bi-at"></i>&nbsp;Email Address
                </span>
              }
            >
              <Form.Control
                className="fw-bold"
                type="email"
                placeholder="Email Address"
                defaultValue={userInfo.user_email}
                ref={emailInputRef}
                onInput={() => sendEmailValidator()}
              />
            </FloatingLabel>
            <Form.Text
              style={{ fontSize: "0.8rem" }}
              className={
                emailChecker.isValid
                  ? "text-success fw-bold my-1"
                  : "text-danger fw-bold my-1"
              }
            >
              {emailChecker.text}&nbsp;
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-3" controlId="inputAboutMe">
            <FloatingLabel
              className="mb-3"
              controlId="labelAboutMe"
              label={
                <span className="text-primary">
                  <i className="bi bi-chat-quote-fill"></i>&nbsp;About me
                </span>
              }
            >
              <Form.Control
                ref={aboutMeInputRef}
                as="textarea"
                className="fw-bold"
                type="text"
                placeholder="About me"
                style={{ height: "6rem" }}
                defaultValue={userInfo.prof_info_about_me}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="social-link-add">
            <div className="d-flex align-items-center justify-content-between w-100">
              <Form.Label className="m-0 fw-bold">
                <span>
                  <i className="bi bi-link-45deg text-primary"></i>
                  &nbsp;Social Link
                </span>
              </Form.Label>
              <Button
                className="p-1"
                size="sm"
                variant="success"
                onClick={() => addSocialLink()}
              >
                <span>
                  <i className="bi bi-plus"></i>Add link
                </span>
              </Button>
            </div>
            <div className="social-link-form my-2">
              <Form.Text style={{ fontSize: "0.7rem" }}>
                Ex. `@MyTwitter : https://www.twitter.com/Profile/You`
              </Form.Text>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Display Text"
                  ref={inputDisplayTextRef}
                />
                <div className="mx-1">:</div>
                <Form.Control
                  text="text"
                  placeholder="Link Address"
                  ref={inputLinkAddressRef}
                />
              </div>
              <div className="social-link-record-badge mt-2">
                {socialLinkRecord.map((item) => (
                  <Badge className="mx-1 my-1" pill key={item.key}>
                    {item.display_text}&nbsp;
                    <span role="button" onClick={() => removeSocialLink(item)}>
                      <i className="bi bi-x-lg"></i>
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <hr />
          <Form.Group
            className="agreement-checkbox my-3"
            controlId="inputAgreeChanges"
          >
            <Form.Check
              onChange={() => setAgreeChanges(!agreeChanges)}
              label="I accept all the changes"
            />
          </Form.Group>
          {agreeChanges ? (
            <div className="edit-prof-submit-wrapper d-flex align-items-center justify-content-end">
              <Button
                className="fw-bold"
                size="sm"
                type="submit"
                variant="success"
              >
                Save Changes&nbsp;
                <SpinnerLoad
                  ref={editInfoSpinnerLoadRef}
                  animation="border"
                  size="sm"
                />
              </Button>
            </div>
          ) : (
            ""
          )}
        </Form>
      </div>
    </Fragment>
  );
};
export default BasicInformationForm;
