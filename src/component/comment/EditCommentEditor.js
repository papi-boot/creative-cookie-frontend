/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Spinner } from "react-bootstrap";
import { useFetch } from "api/useFetch.js";
import { GlobalDataContext } from "context/GlobalData";
const EditCommentEditor = React.forwardRef(
  ({ commentID, commentContent }, ref) => {
    const {
      setGlobalMessage,
      useNotify,
      postReloader,
      setPostReloader,
      showEditCommentModal,
      setShowEditCommentModal,
    } = React.useContext(GlobalDataContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const editCommentEditorRef = React.useRef(null);
    const [editCommentContent, setEditCommentContent] = React.useState("");

    React.useImperativeHandle(ref, () => ({
      submitEditCommentRequest() {
        const params = {
          comment_id: commentID,
          comment_content: editCommentContent,
        };
        useFetch(params, "PUT", "comment", setGlobalMessage, useNotify)
          .then((res) => {
            if (res) {
              if (res.success) {
                setGlobalMessage(res.message);
                useNotify(res.message, "success");
                setPostReloader(!postReloader);
                setShowEditCommentModal(!showEditCommentModal);
              } else {
                setGlobalMessage(res.message);
                useNotify(res.message, "error");
              }
            } else {
              throw new Error(
                "Something went wrong. Please try again or later"
              );
            }
          })
          .catch((err) => {
            setGlobalMessage(err.message);
            useNotify(err.message, "error");
            return false;
          });
      },
    }));

    return (
      <Fragment>
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center flex-column my-3">
            <Spinner animation="border" size="lg" />
            <h6>Loading Field...</h6>
          </div>
        ) : (
          ""
        )}
        <Editor
          tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
          onInit={(e, editor) => {
            editCommentEditorRef.current = editor;
            if (editCommentEditorRef.current) {
              setIsLoading(!isLoading);
            }
          }}
          onEditorChange={(content, editor) => {
            setEditCommentContent(
              editor.getContent({ format: "html", content: true })
            );
          }}
          initialValue={commentContent}
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
            content_css: [`${process.env.PUBLIC_URL}/prism/prism.css`].join(
              "\n"
            ),
            codesample_languages: [{ text: "Auto", value: "javascript" }],
          }}
        />
      </Fragment>
    );
  }
);

export default EditCommentEditor;
