import { Link } from "react-router-dom";
import { NavBarProps, UserState } from "../types";
import "../styles/global/navbar.scss";
import { useState } from "react";

export function NavBar(props: NavBarProps) {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className="navbar">
      {props.userState === UserState.Guest ? <NavBarGuest /> : <NavBarLogged />}
      <div className="navbar__features">
        <button className="features__new-paste">پیست جدید</button>
        <img
          width="50px"
          height="50px"
          src="./images/werdox.png"
          alt=""
          onClick={() => setShowProfile(!showProfile)}
        />
        {showProfile && (
          <div className="profile-dropdown">
            <div className="profile-dropdown__wrapper">
              <div className="profile-dropdown__item">
                {/* <a href="/profile">پروفایل</a> */}
                <Link to="/profile">پروفایل</Link>
              </div>
              <div className="profile-dropdown__item">
                <a>آیتم دراپ داون</a>
              </div>
              <div className="profile-dropdown__item">
                <a>آیتم دراپ داون</a>
              </div>
            </div>
          </div>
        )}
        <img width="24px" height="24px" src="./images/bell.svg" alt="" />
        <div className="features__search">
          <img width="25px" height="25px" src="./images/search.svg" alt="" />
          <input placeholder="چیزی را تایپ کنید"></input>
        </div>
      </div>
    </div>
  );
}

function NavBarGuest() {
  return (
    <div className="navbar__navigation">
      <Link to="/">خانه</Link>
      <Link to="/best-rating">محبوب ترین ها</Link>
      <Link to="/team">تیم ما</Link>
    </div>
  );
}

function NavBarLogged() {
  return (
    <div className="navbar__navigation">
      <Link to="/">خانه</Link>
      <Link to="/best-rating">محبوب ترین ها</Link>
      <Link to="/team">تیم ما</Link>
    </div>
  );
}
