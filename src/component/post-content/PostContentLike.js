import React, { Fragment } from "react";

const PostContentLike = ({ onePostDetail }) => {
  return (
    <Fragment>
      <section className="post-content-like-list">
        {onePostDetail.post_like ? (
          <div>
            {onePostDetail.post_like.map((item) => (
              <div className="row my-2" key={item.plr_id}>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  <span className="fw-bold d-flex align-items-center">
                    <div className="like-profile-img-wrapper me-1">
                      <img
                        src={
                          item.prof_info_image_link
                            ? item.prof_info_image_link
                            : `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`
                        }
                        loading="lazy"
                        className="like-profile-src"
                        alt={item.user_full_name}
                      />
                    </div>
                    &nbsp;
                    {item.user_full_name}
                  </span>
                </div>
                <div className="col-lg-2"></div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </section>
    </Fragment>
  );
};
export default PostContentLike;
