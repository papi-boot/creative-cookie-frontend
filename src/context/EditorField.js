/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Editor } from "@tinymce/tinymce-react";
import SpinnerLoad from "../component/global/SpinnerLoad";
import { Button, Form, Badge } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";
import { GlobalDataContext } from "./GlobalData";
import ToolTip from "../component/global/ToolTip";
const EditorField = React.forwardRef((props, ref) => {
  const { editPostDetail, setEditPostDetail } = React.useContext(
    GlobalDataContext
  );
  const [showLoading, setShowLoading] = React.useState(true);
  const [tagsArray, setTagsArray] = React.useState(editPostDetail.post_tag);
  const [editorFieldContent, setEditorFieldContent] = React.useState("");
  const editorRef = React.useRef(null);
  const tagTextContentRef = React.useRef(null);
  const editorLoadingRef = React.useRef(null);
  React.useLayoutEffect(() => {
    editorLoadingRef.current.toggleSpinner();
  }, []);
  // @TODO: Add tag sequence
  const addTagSequence = () => {
    setTagsArray([
      ...tagsArray,
      { seq: uuidV4(), tag_text: tagTextContentRef.current.value },
    ]);
    tagTextContentRef.current.value = "";
  };

  React.useImperativeHandle(ref, () => ({
    togglePublishPostRequest() {
      return { post_tag: tagsArray, post_content: editorFieldContent };
    },
  }));
  return (
    <Fragment>
      {showLoading ? (
        <div className="d-flex align-items-center justify-content-center flex-column my-4">
          <SpinnerLoad animation="border" size="xl" ref={editorLoadingRef} />
          <span className="my-2 fw-bold">Making you a cookie! Loading...</span>
        </div>
      ) : (
        ""
      )}
      {!showLoading ? (
        <div className="d-flex align-items-center my-2 mx-2">
          <Form.Group controlId="add-tag-input">
            <Form.Control
              ref={tagTextContentRef}
              size="sm"
              placeholder="Include tag i.e '#Hello'"
              className="fw-bold"
            />
          </Form.Group>
          <Form.Group>
            <ToolTip placement="top" text="Add Tag">
              <Button
                size="sm"
                variant="primary"
                className="mx-1"
                onClick={() => {
                  addTagSequence();
                }}
              >
                <span>
                  <i className="bi bi-plus"></i>
                </span>
              </Button>
            </ToolTip>
            <ToolTip placement="top" text="Reset Form">
              <Button
                size="sm"
                variant="danger"
                onClick={() =>
                  setEditPostDetail({
                    post_id: "",
                    post_content: "",
                    post_tag: [],
                  })
                }
              >
                <span>
                  <i className="bi bi-arrow-clockwise"></i>
                </span>
              </Button>
            </ToolTip>
          </Form.Group>
        </div>
      ) : (
        ""
      )}
      <div className="d-flex align-items-center my-2 flex-wrap mx-2">
        {tagsArray.map((item) => (
          <Badge pill key={item.seq} bg="dark" size="sm" className="mx-1 my-1">
            {item.tag_text}
            <button
              className="std-btn-style m-0"
              type="button"
              onClick={() => {
                const filteredDeleteTag = tagsArray.filter(
                  (itemIn) => itemIn.seq !== item.seq
                );
                setTagsArray([...filteredDeleteTag]);
              }}
            >
              <span>
                <i className="bi bi-x-lg"></i>
              </span>
            </button>
          </Badge>
        ))}
      </div>
      <Editor
        tinymceScriptSrc={`${process.env.PUBLIC_URL}/tinymce/tinymce.min.js`}
        initialValue={editPostDetail.post_content}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          if (editorRef.current) {
            setShowLoading(!showLoading);
          }
        }}
        onEditorChange={(content, editor) => {
          setEditorFieldContent(
            editor.getContent({ format: "html", content: true })
          );
        }}
        init={{
          plugins:
            "quickbars autoresize blockquote anchor code emoticons charmap wordcount codesample lists advlist table hr pagebreak nonbreaking print image media imagetools autolink link preview fullscreen visualblocks spellchecker visualchars help searchreplace paste",
          menubar: "file insert view format",
          menu: {
            file: { title: "File", items: "newdocument restoredraft" },
            view: {
              title: "View",
              items:
                "code | visualaid visualchars visualblocks | preview fullscreen",
            },
            insert: {
              title: "Insert",
              items:
                "image link media codesample inserttable pastetext paste | charmap emoticons hr | anchor",
            },
            format: {
              title: "Format",
              items:
                "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontsizes align lineheight | forecolor backcolor | removeformat",
            },
          },
          min_height: 400,
          max_width: "50%",
          toolbar:
            "fullscreen undo redo pastetext paste | bold italic blockquote forecolor backcolor | alignleft aligncenter alignright alignjustify bullist numlist table outdent indent image media codesample emoticons charmap link anchor hr",
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

export default EditorField;
