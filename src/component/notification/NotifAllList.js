import React, { Fragment } from "react";
import { GlobalDataContext } from "context/GlobalData";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
const NotifAllList = () => {
  const { notification, userInfo, setNotifID } = React.useContext(
    GlobalDataContext
  );
  // @get notification
  const getNotification = () =>
    notification.filter(
      (notif) =>
        notif.post_created_by === userInfo.user_id &&
        notif.notif_user_ref !== userInfo.user_id
    );
  return (
    <Fragment>
      {getNotification().length > 0 ? (
        getNotification().map((item) => (
          <div
            key={item.notif_id}
            className={`notification-card-wrapper border p-3 ${
              item.notif_is_open ? "" : "notif-not-open"
            }`}
          >
            <Link
              key={item.notif_id}
              to={`/post?pid=${item.post_id}&ct=${item.notif_type}`}
              style={{ textDecoration: "none" }}
              onClick={() => {
                setNotifID(item.notif_id);
              }}
            >
              <div className="notif-header-wrapper overflow-hidden d-flex align-items-center justify-content-between">
                <div className="notif-header-title">
                  <h6 className="std-black">
                    <span className="">
                      <i
                        className={`${
                          item.notif_type === "Like"
                            ? "bi bi-hand-thumbs-up-fill text-primary"
                            : "bi bi-chat-left-text-fill text-success"
                        }`}
                      ></i>
                      &nbsp;
                      <span className="notif-profile-img-wrapper me-1">
                        <img
                          src={
                            item.prof_info_image_link
                              ? item.prof_info_image_link
                              : `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`
                          }
                          loading="lazy"
                          className="notif-profile-src"
                          alt={item.user_full_name}
                        />
                      </span>
                      <span className="fw-bold">
                        &nbsp;{item.user_full_name}
                      </span>
                      &nbsp;
                      {`${
                        item.notif_type === "Like"
                          ? "Like your"
                          : "Commented on your"
                      }`}
                      &nbsp;Post&nbsp;
                      <span style={{ fontSize: ".8rem", whiteSpace: "nowrap" }}>
                        <i className="bi bi-clock-fill text-primary"></i>
                        &nbsp;
                        {formatDistanceToNow(new Date(item.notif_created_at), {
                          addSuffix: true,
                        })}
                        &nbsp;
                      </span>
                    </span>
                  </h6>
                </div>
              </div>
              <div className="notif-body-wrapper">
                {item.notif_type === "Comment" ? (
                  <Fragment>
                    <div className="d-flex">
                      <h6>
                        <span>
                          <i className="bi bi-at text-success"></i>
                        </span>
                      </h6>
                      <div
                        className="post-content border p-1 px-2 std-black w-100"
                        style={{
                          borderRadius: ".3rem",
                          height: `${
                            item.post_content.length > 200
                              ? "8rem"
                              : "max-content"
                          }`,
                          overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{ __html: item.post_content }}
                      ></div>
                    </div>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="my-4">
          <h4 className="text-center">
            <span>
              <i className="bi bi-magic"></i>&nbsp;Empty Notification
            </span>
          </h4>
        </div>
      )}
    </Fragment>
  );
};

export default NotifAllList;
