/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Spinner } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { GlobalDataContext } from "context/GlobalData";
import { useFetch } from "api/useFetch";
const CommentEditor = React.forwardRef((props, ref) => {
  const {
    showPostDetail,
    setGlobalMessage,
    useNotify,
    postReloader,
    setPostReloader,
    setShowCommentModal,
    showCommentModal,
  } = React.useContext(GlobalDataContext);
  const [commentEditorContent, setCommentEditorContent] = React.useState("");
  const [showLoading, setShowLoading] = React.useState(true);
  const commentEditor = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    submitCommentRequest() {
      const params = {
        post_id: showPostDetail.post.post_id,
        comment_content: commentEditorContent,
      };
      useFetch(params, "POST", "comment", setGlobalMessage, useNotify)
        .then((res) => {
          if (res) {
            if (res.success) {
              setGlobalMessage(res.message);
              useNotify(res.message, "success");
              setShowCommentModal(!showCommentModal);
              setPostReloader(!postReloader);
            } else {
              setGlobalMessage(res.message);
              useNotify(res.message, "error");
            }
          } else {
            throw new Error("Something went wrong. Please try again later.");
          }
        })
        .catch((err) => {
          setGlobalMessage(err.message);
          useNotify(err.message, "error");
        });
    },
  }));
  return (
    <Fragment>
      {showLoading ? (
        <div className="d-flex align-items-center justify-content-center flex-column my-2">
          <Spinner animation="border" size="lg" />
          <h6>Loading field...</h6>
        </div>
      ) : (
        ""
      )}
      <Editor
        tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
        onInit={(e, editor) => {
          commentEditor.current = editor;
          if (commentEditor.current) {
            setShowLoading(!showLoading);
          }
        }}
        onEditorChange={(content, editor) => {
          setCommentEditorContent(
            editor.getContent({ format: "html", content: true })
          );
        }}
        init={{
          plugins:
            "quickbars autosave autoresize blockquote anchor code emoticons charmap wordcount codesample lists advlist table hr pagebreak nonbreaking print image media imagetools autolink link preview fullscreen visualblocks spellchecker visualchars help searchreplace",
          autosave_restore_when_empty: true,
          min_height: 200,
          placeholder: "Write a comment...",
          width: "100%",
          menubar: false,
          toolbar:
            "fullscreen | bold italic blockquote forecolor backcolor | alignleft aligncenter alignright alignjustify bullist numlist table outdent indent image media codesample emoticons charmap link anchor hr",
          toolbar_mode: "sliding",
          quickbars_selection_toolbar:
            "bold italic forecolor backcolor formatselect quicklink blockquote",
          quickbars_insert_toolbar: false,
          help_tabs: ["shortcuts", "keyboardnav"],
          image_advtab: true,
          image_caption: true,
          a11y_advanced_options: true,
          media_filter_html: true,
          image_title: true,
          imagetools_toolbar:
            "rotateleft rotateright | flipv fliph | editimage imageoptions",
          toolbar_sticky: true,
          branding: false,
          resize: false,
          object_resizing: true,
          content_css: [`${process.env.PUBLIC_URL}/prism/prism.css`].join("\n"),
          codesample_languages: [{ text: "Auto", value: "javascript" }],
        }}
      />
    </Fragment>
  );
});

export default CommentEditor;
