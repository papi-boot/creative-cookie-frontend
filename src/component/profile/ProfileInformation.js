/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Button, Modal, ListGroup, Badge } from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import { format } from "date-fns";
import SpinnerLoad from "component/global/SpinnerLoad";
import ToolTip from "component/global/ToolTip";
import EditAccountModal from "component/profile/EditAccountModal";
const ProfileInformation = () => {
  const {
    userInfo,
    setGlobalMessage,
    useNotify,
    setPostReloader,
    postReloader,
  } = React.useContext(GlobalDataContext);
  const [imgSrc, setImgSrc] = React.useState(userInfo.prof_info_image_link);
  const imageInputFileRef = React.useRef(null);
  const imageSrcPreviewRef = React.useRef(null);
  const setNewProfileSpinnerLoad = React.useRef(null);
  const editAccountModalRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const close = () => setShow(!show);

  //@TODO: Capture every change image;
  const capturePickImage = (e) => {
    const file = imageInputFileRef.current.files[0];
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      setImgSrc(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  // @TODO: send upload image request
  const sendUploadImageRequest = () => {
    setNewProfileSpinnerLoad.current.toggleSpinner();
    const params = {
      image_uri: imgSrc,
    };
    useFetch(params, "POST", "upload-image", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPostReloader(!postReloader);
            setNewProfileSpinnerLoad.current.toggleSpinner();
            close();
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "error");
            setNewProfileSpinnerLoad.current.toggleSpinner();
            close();
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setNewProfileSpinnerLoad.current.toggleSpinner();
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
        close();
      });
  };

  // @TODO: modal image option
  const PickImageModal = () => (
    <Fragment>
      <Modal centered size="sm" show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="m-0">
              <span>
                <i className="bi bi-gear-fill"></i>&nbsp;Option
              </span>
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ListGroup>
            <ListGroup.Item action as="label" htmlFor="pickImage">
              <span className="fw-bold">
                <i className="bi bi-image text-success"></i>&nbsp;Pick Image
              </span>
            </ListGroup.Item>
            <ListGroup.Item action onClick={() => sendUploadImageRequest()}>
              <span className="fw-bold">
                <i className="bi bi-check-circle-fill text-success"></i>&nbsp;
                {"Set new Profile Picture"}&nbsp;
                <SpinnerLoad
                  animation="border"
                  size="sm"
                  ref={setNewProfileSpinnerLoad}
                />
              </span>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </Fragment>
  );

  // @TODO: open edit account modal
  const openEditAccountModal = () => {
    editAccountModalRef.current.toggleModal();
  };
  return (
    <Fragment>
      <EditAccountModal ref={editAccountModalRef} />
      <PickImageModal />
      <section className="profile-information-section border w-100 p-3">
        <div className="section-header w-100 d-flex align-items-center justify-content-between">
          <h6 className="text-black-50">
            <span>
              <i className="bi bi-person-fill text-primary"></i>&nbsp;Profile
              Information
            </span>
          </h6>
          <ToolTip placement="bottom" text="Edit Account">
            <Button
              variant="primary"
              style={{ clipPath: "circle(36% at 50% 50%)" }}
              onClick={() => openEditAccountModal()}
            >
              <span>
                <i className="bi bi-gear-fill"></i>
              </span>
            </Button>
          </ToolTip>
        </div>
        <div className="position-relative">
          <div className="profile-image-wrapper">
            <img
              src={imgSrc}
              ref={imageSrcPreviewRef}
              className="profile-image-src d-block mx-auto"
              alt="Profile"
              loading="lazy"
            />
          </div>
          <div className="profile-btn-pick-wrapper d-flex align-items-center justify-content-center position-absolute w-100">
            <div
              style={{
                background: "#fff",
                clipPath: "circle(49% at 54% 50%)",
                margin: "0 0 0 6rem",
              }}
            >
              <Button
                bsPrefix="pick-img-icon"
                className="profile-btn-pick-img"
                variant="dark"
                onClick={() => setShow(!show)}
              >
                <span style={{ margin: "0 0 0 4px" }}>
                  <i className="bi bi-camera"></i>
                </span>
              </Button>
            </div>
          </div>
          <input
            className="d-none"
            type="file"
            accept="image/*"
            ref={imageInputFileRef}
            id="pickImage"
            onChange={(e) => capturePickImage(e)}
          />
        </div>
        <div className="profile-information-name">
          <h5 className="text-center fw-bold">{userInfo.user_full_name}</h5>
        </div>
        <div className="profile-information-email">
          <h6
            className="text-center text-black-50"
            style={{ fontSize: ".9rem" }}
          >
            {userInfo.user_email}
          </h6>
          <h6
            className="text-center text-black-50"
            style={{ fontSize: ".9rem" }}
          >
            Joined&nbsp;
            {userInfo.user_created_at
              ? format(new Date(userInfo.user_created_at), "MMMM yyyy")
              : ""}
          </h6>
        </div>
        <div
          className="my-3 w-100"
          style={{ background: "rgba(70,70,70,.2)", height: "1px" }}
        ></div>
        <div className="section-about-me my-3">
          <h6 className="text-black-50">
            <span>
              <i className="bi bi-chat-quote-fill text-success"></i>&nbsp;About
              me
            </span>
          </h6>
          <div
            className="profile-about-me"
            style={{ borderLeft: ".3rem solid rgba(70,70,70,.1)" }}
          >
            {userInfo.prof_info_about_me ? (
              <p className="fw-bold my-3 ps-2">{userInfo.prof_info_about_me}</p>
            ) : (
              <p className="text-center my-3 text-black-50">
                Share a little bit background about yourself.
              </p>
            )}
          </div>
        </div>
        <div
          className="my-3 w-100"
          style={{ background: "rgba(70,70,70,.2)", height: "1px" }}
        ></div>
        <div className="section-social-links">
          <h6 className="text-black-50">
            <span>
              <i className="bi bi-link-45deg text-danger"></i>Social Links
            </span>
          </h6>
          <div className="profile-social-links">
            {userInfo.prof_info_social_link ? (
              <div>
                {JSON.parse(userInfo.prof_info_social_link).map((item) => (
                  <Badge
                    className="mx-1 text-white text-decoration-none"
                    pill
                    as="a"
                    target="_blank norel noopener"
                    key={item.key}
                    href={item.link_address}
                  >
                    {item.display_text}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-center text-black-50">Add social links</p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default ProfileInformation;
