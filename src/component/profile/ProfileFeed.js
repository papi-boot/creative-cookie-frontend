import React, { Fragment } from "react";

const ProfileFeed = () => {
  return (
    <Fragment>
      <section className="profile-feed-section border w-100 p-3">
        <h6>
          <span>
            <i className="bi bi-rss-fill"></i>
          </span>
          &nbsp;Your Feed
        </h6>
      </section>
    </Fragment>
  );
};
export default ProfileFeed;
