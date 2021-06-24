import React from "react";
import "../styles/global/team.scss";
import { Project } from "./Project";

export function Team() {
  return (
    <div className="team">
      <div className="team__wrapper">
        <div className="team__header">
          <img width="136" height="136" src="./images/werdox.png" alt="" />
          <h4>سربازانه امام در راه پیستپ</h4>
          <h2>"ما میرینیم تو وبسایت ها و اپلیکیشن ها"</h2>
          <div className="header__actions">
            <button className="actions__samples">نمونه کار های ما</button>
            <button className="actions__request">درخواست پروژه</button>
          </div>
        </div>
        <div className="team__sections">
          <div className="sections__wrapper">
            <div className="section section--selected">پروژه های ما</div>
            <div className="section">نمونه کار ها</div>
            <div className="section">افراد تیم ما</div>
          </div>
          <div className="sections__divider"></div>
        </div>
        <div className="team__projects">
          <div className="projects__wrapper">
            <Project
              type="طراحان UI / UX"
              title="وبسایت پیستپ"
              picture="none"
            ></Project>
            <Project
              type="طراحان UI / UX"
              title="وبسایت پیستپ"
              picture="none"
            ></Project>
          </div>
        </div>
      </div>
    </div>
  );
}
