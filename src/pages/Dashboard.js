/* eslint-disable react-hooks/rules-of-hooks*/
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { Fragment } from "react";
import { GlobalDataContext } from "../context/GlobalData";
import { withRouter } from "react-router-dom";
import { useQuery } from "../api/useQuery";
import Prism from "prismjs";
import DashboardPost from "../pages-component/dashboard/DashboardPost";
import PlaceHolderPost from "../component/global/PlaceHolderPost";
const Dashboard = () => {
  const {
    setPost,
    post,
    setGlobalMessage,
    useNotify,
    postReloader,
    postLimit,
    loadMorePostRef,
    postOneItem,
    postLike,
    postComment,
    btnLoadMoreRef,
    setLastPostLimit,
    lastPostLimit,
    setPostLike,
    showPostDetail,
    setShowPostDetail,
    setPostComment,
    likeSpinnerLoadRef,
  } = React.useContext(GlobalDataContext);
  const [showPlaceholder, setShowPlaceholder] = React.useState(true);
  const [showPostReloader, setShowPostReloader] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("body-color-light");
    Prism.highlightAll();
    fetch(
      process.env.NODE_ENV === "production"
        ? "https://creative-cookie.herokuapp.com/post"
        : "http://localhost:3030/post",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: { "post-list": postLimit },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          if (res.success) {
            setGlobalMessage(res.message);
            setPost(res.post);
            setPostLike(res.post_like);
            setPostComment(res.post_comment);
            setShowPlaceholder(false);
            Prism.highlightAll();
            const likeSpinner = document.querySelectorAll(".like-spinner");
            likeSpinnerLoadRef.current = likeSpinner;
            if (res.post.length > lastPostLimit) {
              loadMorePostRef.current.toggleSpinner();
              setLastPostLimit(res.post.length);
            }
            if (postLimit > res.post_item[0].count) {
              loadMorePostRef.current.toggleSpinner();
              btnLoadMoreRef.current.classList.add("d-none");
            }
            setShowPostReloader(!showPostReloader);
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
      .catch((err) => {
        setGlobalMessage(err.message);
        useNotify(err.message, "success");
      });
  }, [postReloader]);

  React.useEffect(() => {
    const filterComment = postComment.filter(
      (postCommentItem) =>
        postCommentItem.comment_post_ref === postOneItem.post_id
    );
    console.log(`Pre COMMENT: ${postComment.length}`);
    console.log(`Filtered COMMENT: ${filterComment.length}`);
    setShowPostDetail({
      ...showPostDetail,
      post: postOneItem,
      post_comment: filterComment,
    });
  }, [showPostReloader]);

  return (
    <Fragment>
      <section className="main-content post-container-gap" style={{marginTop: "5rem"}}>
        {showPlaceholder ? <PlaceHolderPost /> : <DashboardPost />}
      </section>
    </Fragment>
  );
};
export default withRouter(Dashboard);
