import React from "react";
import { useNotify } from "../api/useNotify";
import { lightTheme, darkTheme } from "../style/root";
export const GlobalDataContext = React.createContext();

const GlobalDataProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userInfo, setUserInfo] = React.useState({});
  const [postLimit, setPostLimit] = React.useState(5);
  const [lastPostLimit, setLastPostLimit] = React.useState(postLimit);
  const [globalMessage, setGlobalMessage] = React.useState("");
  const [globalStyle, setGlobalStyle] = React.useState(lightTheme);
  const [dataReloader, setDataReloader] = React.useState(false);
  const [authenticateTab, setAuthenticateTab] = React.useState("Login");
  const [isPostSubmitted, setIsPostSubmitted] = React.useState(false);
  const [post, setPost] = React.useState([]);
  const [postLike, setPostLike] = React.useState([]);
  const [postComment, setPostComment] = React.useState([]);
  const [postReloader, setPostReloader] = React.useState(false);
  const [editPostDetail, setEditPostDetail] = React.useState({
    post_id: "",
    post_content: "",
    post_tag: [],
  });
  const [showPostDetail, setShowPostDetail] = React.useState({post: {}, post_like: [], post_commnet: []});
  const [postOneItem, setPostOneItem] = React.useState({});
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const loadMorePostRef = React.useRef(null);
  const btnLoadMoreRef = React.useRef(null);
  const likeSpinnerLoadRef = React.useRef([]);
  const value = {
    isAuthenticated,
    globalMessage,
    globalStyle,
    userEmail,
    userInfo,
    post,
    showCommentModal,
    postLike,
    postComment,
    postLimit,
    postOneItem,
    lastPostLimit,
    editPostDetail,
    showPostDetail,
    postReloader,
    dataReloader,
    authenticateTab,
    isPostSubmitted,
    setPost,
    setPostOneItem,
    setLastPostLimit,
    setPostLimit,
    setPostLike,
    setPostComment,
    setIsPostSubmitted,
    setIsAuthenticated,
    setPostReloader,
    setDataReloader,
    setUserEmail,
    setUserInfo,
    setShowPostDetail,
    setShowCommentModal,
    setEditPostDetail,
    setAuthenticateTab,
    setGlobalMessage,
    setGlobalStyle,
    useNotify,
    loadMorePostRef,
    btnLoadMoreRef,
    likeSpinnerLoadRef
  };
  return (
    <GlobalDataContext.Provider value={value}>
      {props.children}
    </GlobalDataContext.Provider>
  );
};

export default GlobalDataProvider;
