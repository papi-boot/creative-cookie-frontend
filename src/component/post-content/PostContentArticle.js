import React, { Fragment } from "react";
const PostContentArticle = ({ onePostDetail }) => {
  return (
    <Fragment>
      <div className="post-content-article-wrapper">
        <article
          className="post-content-article"
          dangerouslySetInnerHTML={{
            __html: onePostDetail.post
              ? onePostDetail.post[0].post_content
              : "",
          }}
        ></article>
      </div>
    </Fragment>
  );
};

export default PostContentArticle;
