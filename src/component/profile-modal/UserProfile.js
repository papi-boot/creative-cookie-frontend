import React, { Fragment } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "react-bootstrap";
const UserProfile = ({ user }) => {
  return (
    <Fragment>
      <section className="user-profile-wrapper py-3">
        <div className="user-basic-info">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="text-primary m-0">
              <span>
                <i className="bi bi-info-circle-fill"></i>
              </span>
              &nbsp;Basic Info
            </h6>
            <div className="status-indicator d-flex align-items-center">
              <div
                style={{
                  clipPath: "circle(50% at 50% 50%)",
                  backgroundColor: user.status_is_active
                    ? "#00ff00"
                    : "#ff0000",
                  borderRadius: "50%",
                  height: ".7rem",
                  width: ".7rem",
                }}
              ></div>
              &nbsp;
              <h6 className="m-0 status-text" style={{ fontSize: ".8rem" }}>
                {user.status_socket_id && user.status_user_ref && user.status_is_active ? (
                  <span>Active Now</span>
                ) : (
                  <span>
                    {user.status_socket_id && user.status_user_ref ? (
                      <span>
                        Active&nbsp;
                        {formatDistanceToNow(new Date(user.status_updated_at), {
                          addSuffix: true,
                        })}
                      </span>
                    ) : (
                      "Not Validated"
                    )}
                  </span>
                )}
              </h6>
            </div>
          </div>
          <div className="user-profile-img-wrapper">
            <img
              className="user-profile-img"
              src={
                user.prof_info_image_link
                  ? user.prof_info_image_link
                  : `https://avatars.dicebear.com/api/adventurer-neutral/${Math.random()}.svg`
              }
              alt={user.user_full_name}
            />
          </div>
          <div className="user-profile-basic-info my-2">
            <h5 className="text-center fw-bold">{user.user_full_name}</h5>
            <p className="text-center" style={{ fontSize: ".9rem" }}>
              Joined&nbsp;
              {user.user_created_at ? (
                <span>
                  {format(new Date(user.user_created_at), "MMMM yyyy")}
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
        </div>
        <hr />
        <div className="user-about-me">
          <h6 className="text-success">
            <span>
              <i className="bi bi-chat-quote-fill"></i>
            </span>
            &nbsp;About Me
          </h6>
          <div className="user-about-me-text">
            {user.prof_info_about_me ? (
              <p
                className="fw-bold ps-1"
                style={{ borderLeft: ".3rem solid rgba(70,70,70,.1)" }}
              >
                {user.prof_info_about_me}
              </p>
            ) : (
              <p>No Information provided.</p>
            )}
          </div>
        </div>
        <hr />
        <div className="user-social-link">
          <h6 className="text-danger">
            <span>
              <i className="bi bi-link-45deg"></i>
            </span>
            &nbsp;Social Link
          </h6>
          <div className="user-social-link-item">
            {user.prof_info_social_link ? (
              <div>
                {JSON.parse(user.prof_info_social_link).map((item) => (
                  <Badge key={item.key} className="m-1" pill>
                    <a
                      href={item.link_address}
                      rel="noreferrer"
                      target="_blank"
                      className="text-white text-decoration-none"
                    >
                      {item.display_text}
                    </a>
                  </Badge>
                ))}
              </div>
            ) : (
              <p>No links provided.</p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default UserProfile;
