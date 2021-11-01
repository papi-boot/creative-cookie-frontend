/* eslint-disable react-hooks/rules-of-hooks*/
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { Fragment } from "react";
import { GlobalDataContext } from "../context/GlobalData";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useFetch } from "../api/useFetch";
import NavTop from "../component/global/NavTop";
import NavBottom from "../component/global/NavBottom";
import DashboardPost from "../pages-component/dashboard/DashboardPost";
import PlaceHolderPost from "../component/global/PlaceHolderPost";
const Dashboard = () => {
  const {
    setPost,
    setGlobalMessage,
    useNotify,
    postReloader,
  } = React.useContext(GlobalDataContext);
  const [showPlaceholder, setShowPlaceholder] = React.useState(true);
  React.useEffect(() => {
    document.body.classList.add("body-color-light");
    useFetch(null, "GET", "post", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setPost(res.post);
            setShowPlaceholder(false);
            require("../style/prism.css");
          } else {
            setGlobalMessage(res.message);
            useNotify(res.message, "success");
            setPost([]);
            setShowPlaceholder(false);
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch();
  }, [postReloader]);

  return (
    <Fragment>
      <section className="main-content post-container-gap">
        {showPlaceholder ? <PlaceHolderPost /> : <DashboardPost />}
      </section>
    </Fragment>
  );
};
export default withRouter(Dashboard);
