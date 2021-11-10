import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { GlobalDataContext } from "context/GlobalData";
const PostContentTab = () => {
  const { showPostDetail } = React.useContext(GlobalDataContext);
  return (
    <Fragment>
      <Container>
        <div
          className="show-post-content"
          dangerouslySetInnerHTML={{ __html: showPostDetail.post.post_content }}
        ></div>
      </Container>
    </Fragment>
  );
};

export default PostContentTab;
