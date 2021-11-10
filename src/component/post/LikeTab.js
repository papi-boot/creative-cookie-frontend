import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
const LikeTab = () => {
  const { showPostDetail } = React.useContext(GlobalDataContext);
  return (
    <Fragment>
      <Container>
        {showPostDetail.post_like.length > 0 ? (
          showPostDetail.post_like.map((item) => (
            <div className="row my-2" key={item.plr_id}>
              <div className="col-lg-4"></div>
              <div className="col-lg-4">
                <span className="fw-bold">
                  <i className="bi bi-check-circle-fill text-primary"></i>
                  &nbsp;
                  {item.user_full_name}
                </span>
              </div>
              <div className="col-lg-4"></div>
            </div>
          ))
        ) : (
          <div className="my-4">
            <h4 className="text-center text-black-50">
              <span className="bi bi-hand-thumbs-up-fill"></span>&nbsp;Empty
              Like
            </h4>
          </div>
        )}
      </Container>
    </Fragment>
  );
};
export default LikeTab;
