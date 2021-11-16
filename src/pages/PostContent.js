/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useFetch } from "api/useFetch";
import { GlobalDataContext } from "context/GlobalData";
import PostContentTab from "pages-component/post-content/PostContentTab";
const PostContent = () => {
  const { post_id } = useParams();
  const { postReloader, setGlobalMessage, useNotify } = React.useContext(
    GlobalDataContext
  );
  const [onePostDetail, setOnePostDetail] = React.useState({});

  // @TODO: Fetch Data;
  React.useEffect(() => {
    const params = {
      post_id,
    };
    useFetch(params, "POST", "one-post", setGlobalMessage, useNotify)
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setOnePostDetail(res);
            console.log(onePostDetail);
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
  }, [postReloader]);
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
