import PropTypes from "prop-types";
import HeaderItem from "./HeaderItem";
import Mode from "../Mode";
import { Link } from "react-router-dom";
import "../../styles/header.scss";
import { useState } from "react";

const Header = (props) => {
	const [showProfile, setShowProfile] = useState(false);

	return (
		<div className="navbar">
			<div className="navbar__navigation">
				<Mode {...props} />
				<HeaderItem link="/" name="خانه" />
				<HeaderItem link="/best-rating" name="محبوب ترین ها" />
				<HeaderItem link="/team" name="تیم ما" />
			</div>
			<div className="navbar__features">
				<Link className="features__new-paste" to="/new-paste">پیست جدید</Link>
				<img
					width="50px"
					height="50px"
					src={props.user.avatar ? props.backend + "/avatars/" + props.user.avatar : "/images/guest.jpg"}
					alt=""
					onClick={() => setShowProfile(!showProfile)}
				/>
				{showProfile && (
					<div className="profile-dropdown">
                        {props.user.avatar ? (<div className="profile-dropdown__wrapper">
                            <div className="profile-dropdown__item">
                                <Link to="/accounts/dashboard">مدریت</Link>
                            </div>
                            <div className="profile-dropdown__item">
                                <Link to={"/accounts/view/" + props.user.username}>پروفایل</Link>
                            </div>
                            <div className="profile-dropdown__item">
                                <Link to="/profile">مدریت</Link>
                            </div>
                        </div>) : (<div className="profile-dropdown__wrapper">

                            <div className="profile-dropdown__item">
                                <Link to="/accounts/register">ثبت نام</Link>
                            </div>
                            <div className="profile-dropdown__item">
                                <Link to="/accounts/login">ورود</Link>
                            </div>
                        </div>)}


					</div>
				)}

				{/*<img width="24px" height="24px" src="/images/bell.svg" alt="" />*/}
				<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
					 stroke="#9F9F9F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
					 className="feather feather-bell">
					<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
					<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
				</svg>
				<div className="features__search">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
						 stroke="#808080" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
						 className="feather feather-search">
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
					{/*<img width="25px" height="25px" src="/images/search.svg" alt="" />*/}
					<input placeholder="چیزی را تایپ کنید"></input>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	currentMode: PropTypes.string.isRequired,
	toggleMode: PropTypes.func.isRequired,
};

Header.defaultProps = {};

export default Header;
