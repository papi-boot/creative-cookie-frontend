/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TumblrShareButton,
  TumblrIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { GlobalDataContext } from "context/GlobalData";
import { Button } from "react-bootstrap";
import ToolTip from "component/global/ToolTip";
const MenuShareList = () => {
  const { sharePostDetail, useNotify } = React.useContext(GlobalDataContext);
  const [url, setUrl] = React.useState(
    `https://www.creative-cookie.studio/post?pid=${sharePostDetail.post_id}&ct="Post"`
  );
  const [quote, setQuote] = React.useState(
    `Thread post by ${sharePostDetail.user_full_name}`
  );
  const copyPostLinkTextAreaRef = React.useRef(null);

  // @TODO: copy link
  const copyPostLinkEvent = () => {
    copyPostLinkTextAreaRef.current.textContent = url;
    copyPostLinkTextAreaRef.current.select();
    window.document.execCommand("copy");
    useNotify("Link copy to clipboard", "info");
  };
  return (
    <Fragment>
      <section className="share-link-item d-flex align-items-center flex-wrap py-3">
        <ToolTip placement="top" text="Facebook">
          <FacebookShareButton
            url={url}
            quote={quote}
            description={quote}
            className="mx-1 my-1"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </ToolTip>
        <ToolTip placement="top" text="Twitter">
          <TwitterShareButton title={quote} url={url} className="mx-1 my-1">
            <TwitterIcon size={40} round />
          </TwitterShareButton>
        </ToolTip>
        <ToolTip placement="top" text="LinkedIn">
          <LinkedinShareButton
            className="mx-1 my-1"
            title={quote}
            summary="I am sharing this post."
            url={url}
          >
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </ToolTip>
        <ToolTip placement="top" text="Pinterest">
          <PinterestShareButton
            media="https://repository-images.githubusercontent.com/420929930/197be3c3-ebfe-4136-834e-4afd98e6c77f"
            url={url}
            description={quote}
            className="mx-1 my-1"
          >
            <PinterestIcon size={40} round />
          </PinterestShareButton>
        </ToolTip>
        <ToolTip placement="top" text="Reddit">
          <RedditShareButton className="mx-1 my-1" url={url} title={quote}>
            <RedditIcon size={40} round />
          </RedditShareButton>
        </ToolTip>
        <ToolTip placement="top" text="Telegram">
          <TelegramShareButton className="mx-1 my-1" url={url} title={quote}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
        </ToolTip>
        <ToolTip placement="top" text="Tumblr">
          <TumblrShareButton className="mx-1 my-1" url={url} title={quote}>
            <TumblrIcon size={40} round />
          </TumblrShareButton>
        </ToolTip>
        <ToolTip placement="top" text="Email">
          <EmailShareButton
            subject={quote}
            body={`${url}, I am sharing this post!`}
            className="mx-1 my-1"
          >
            <EmailIcon size={40} round />
          </EmailShareButton>
        </ToolTip>
        <div className="m-1" style={{ clipPath: "circle(46% at 50% 49%)" }}>
          <ToolTip placement="top" text="Copy Link">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => copyPostLinkEvent(e)}
            >
              <span>
                <i
                  className="bi bi-link-45deg"
                  style={{ fontSize: "1.3rem" }}
                ></i>
              </span>
            </Button>
          </ToolTip>
          <textarea
            style={{ left: "-100%", position: "absolute" }}
            ref={copyPostLinkTextAreaRef}
          ></textarea>
        </div>
      </section>
    </Fragment>
  );
};
export default MenuShareList;
