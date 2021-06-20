import { useState } from "react";
import "../styles/global/paste.scss";
import { PasteProps } from "../types";

export function Paste(props: PasteProps) {
  const [isLiked, setLiked] = useState(false);
  return (
    <div className="paste">
      <div className="paste__wrapper">
        <div className="paste__header">
          <div className="header__profile-info">
            <img width="48" height="48" src={props.profilePic} alt="" />
            <div className="profile-info__name">
              <p>{props.userName}</p>
              <p className="text-muted">{props.userLocation}</p>
            </div>
          </div>
          <button className="header__more-info">اطلاعات بیشتر</button>
        </div>
        <div className="paste__code">
          <div className="code">
            <div className="code__wrapper">{props.code}</div>
          </div>
          <div className="code__features">
            <div className="features__right">
              <img
                width="24"
                height="24"
                src={isLiked ? "./images/heart-fill.svg" : "./images/heart.svg"}
                onClick={() => setLiked(!isLiked)}
                alt=""
              />
              <img width="24" height="24" src="./images/comment.svg" alt="" />
            </div>
            <div className="features__left">
              <img width="24" height="24" src="./images/bookmark.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="paste__footer">
          <h3 className="footer__title">{props.title}</h3>
          <p className="footer__description">{props.description}</p>
        </div>
      </div>
    </div>
  );
}
