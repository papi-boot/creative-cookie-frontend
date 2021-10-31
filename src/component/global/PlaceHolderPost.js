import React, { Fragment } from "react";
import { Placeholder } from "react-bootstrap";
const PlaceHolderPost = () => {
  const [placeholderList, setPlaceholderList] = React.useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);
  return (
    <Fragment>
      {placeholderList.map((item) => (
        <div key={item.id} className="post-card-wrapper border">
          <div className="post-header border-bottom py-1">
            <div>
              <div
                className="shine"
                style={{ width: "15rem", height: "1.2rem" }}
              ></div>
            </div>
            <div className=" ms-1">
              <div
                className="shine"
                style={{ width: "5rem", height: "1.2rem" }}
              ></div>
            </div>
          </div>
          <div className="post-date my-2">
            <div
              className="shine"
              style={{ width: "20%", height: "1.2rem" }}
            ></div>
          </div>
          <div className="post-body-wrapper">
            <div
              className="shine"
              style={{ width: "100%", height: "1.2rem" }}
            ></div>
            <div
              className="shine"
              style={{ width: "45%", height: "1.2rem" }}
            ></div>
            &nbsp;
            <div
              className="shine"
              style={{ width: "45%", height: "1.2rem" }}
            ></div>
            <div
              className="shine"
              style={{ width: "100%", height: "1.2rem" }}
            ></div>
            <div
              className="shine"
              style={{ width: "45%", height: "1.2rem" }}
            ></div>
            &nbsp;
            <div
              className="shine"
              style={{ width: "45%", height: "1.2rem" }}
            ></div>
          </div>
          <div className="post-footer border-top">
            <div className="w-100 d-flex justify-content-center"></div>
            <div className="w-100 d-flex justify-content-center">
              <Placeholder animation="glow" />
            </div>
            <div className="w-100 d-flex justify-content-center"></div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};
export default PlaceHolderPost;
