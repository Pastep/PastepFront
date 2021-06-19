import { useState } from "react";
import "../styles/global/paste.scss";
import { PasteProps } from "../types";

export function Paste(props: PasteProps) {
  const [isLiked, setLiked] = useState(false);
  return (
    <div className="paste">
      <div className="paste__header">
        <div className="profile-info">
          <img width="48" height="48" src={props.profilePic} />
          <div className="profile-info__name">
            <p>{props.userName}</p>
            <p className="text-muted">{props.userLocation}</p>
          </div>
        </div>
        <a className="more-info" href="#">
          اطلاعات بیشتر
        </a>
      </div>
      <div className="paste__code">
        <div className="paste__code-wrapper">{props.code}</div>
        <div className="paste__code-features">
          <div className="features-right">
            <img
              width="24"
              height="24"
              src={isLiked ? "./images/heart-fill.svg" : "./images/heart.svg"}
              onClick={() => setLiked(!isLiked)}
            />
            <img width="24" height="24" src="./images/comment.svg" />
          </div>
          <div className="features-left">
            <img width="24" height="24" src="./images/bookmark.svg" />
          </div>
        </div>
        <div className="paste__footer">
          <h3 className="paste__footer-title">{props.title}</h3>
          <p className="paste__footer-description">{props.description}</p>
        </div>
      </div>
    </div>
  );
}
