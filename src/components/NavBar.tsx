import { Link } from "react-router-dom";
import { routes } from "../routing";
import "../styles/global/navbar.scss";
import { NavBarProps } from "../types";

export function NavBar(props: NavBarProps) {
  var linkComponents = [];
  for (let i = 0; i < props.routes.length; i++) {
    linkComponents.push(
      <Link to={routes[i].destination} key={i}>
        {routes[i].text}
      </Link>
    );
  }
  return (
    <div className="navbar">
      <div className="navbar__navigation">{linkComponents}</div>
      <div className="navbar__features">
        <a className="navbar__new-paste" href="#">
          پیست جدید
        </a>
        <img width="50px" height="50px" src="./images/werdox.png"></img>
        <img width="24px" height="24px" src="./images/bell.svg"></img>
        <div className="navbar__search">
          <img width="25px" height="25px" src="./images/search.svg"></img>
          <input placeholder="چیزی را تایپ کنید"></input>
        </div>
      </div>
    </div>
  );
}
