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
                  <span className="fw-bold">
                    <i className="bi bi-check-circle-fill text-primary"></i>
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
