/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import Prism from "prismjs";
import PostContentTab from "pages-component/post-content/PostContentTab";
const PostContent = () => {
  const { post_id } = useParams();
  const {
    postReloader,
    setGlobalMessage,
    setNotification,
    useNotify,
    notifID,
    setCurrentURL
  } = React.useContext(GlobalDataContext);
  const [onePostDetail, setOnePostDetail] = React.useState({});
  // @TODO: Fetch Data;
  React.useEffect(() => {
    setCurrentURL(`${window.location.pathname}${window.location.search}`);
    localStorage.setItem("URL", `${window.location.pathname}${window.location.search}`);
    document.body.classList.add("body-color-light");
    const params = {
      post_id,
    };
    useFetch(params, "POST", "one-post", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setOnePostDetail(res);
            Prism.highlightAll();
          } else {
            // Should render 404 page not found
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
    useFetch(null, "GET", "notification", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setNotification(res.notification);
          } else {
            setGlobalMessage(res.message);
            return;
          }
        } else {
          throw new Error("Somthing went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  }, [postReloader]);
  React.useLayoutEffect(() => {
    useFetch(
      { notif_id: notifID },
      "PUT",
      "notification",
      setGlobalMessage,
      useNotify
    )
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            return;
          } else {
            setGlobalMessage(res.message);
          }
        } else {
          throw new Error("Something went wrong. Please try again or later");
        }
      })
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "error");
      });
  }, []);
  return (
    <Fragment>
      <Container>
        <section className="post-content-wrapper">
          <PostContentTab onePostDetail={onePostDetail} />
        </section>
      </Container>
    </Fragment>
  );
};
export default withRouter(PostContent);
