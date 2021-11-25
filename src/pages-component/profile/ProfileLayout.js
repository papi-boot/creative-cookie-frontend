import React, { Fragment } from "react";
import ProfileInformation from "component/profile/ProfileInformation";
import ProfileFeed from "component/profile/ProfileFeed";
const ProfileLayout = () => {
  return (
    <Fragment>
      <div className="profile-grid-wrapper">
        <ProfileInformation />
        <ProfileFeed />
      </div>
    </Fragment>
  );
};
export default ProfileLayout;
