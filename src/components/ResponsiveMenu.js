import {Link} from "react-router-dom";

const responsiveMenu = (props) => {
    return <div className="menu-responsive" style={{left: props.menu ? "0" : "100%"}}>
        <div className="menu mode-toggle opened"
             aria-label="Main Menu" onClick={() => {props.setMenu(false)}}>
            <svg width="28" height="28" viewBox="0 0 100 100" style={{pointerEvents: "none"}}>
                <path className="line line1"
                      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
                <path className="line line2" d="M 20,50 H 80"/>
                <path className="line line3"
                      d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
            </svg>
        </div>
        <div className="header">
            <h1>پیستپ</h1>
        </div>
        <div className="options" onClick={() => {props.setMenu(false)}}>
            <Link to="/">خانه</Link>
            <Link to="/best-rating">مجبوب ترین ها</Link>
            <Link to="/team">تیم ما</Link>
        </div>
    </div>;
};

export default responsiveMenu;