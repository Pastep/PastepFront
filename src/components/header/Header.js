import PropTypes from "prop-types";
import HeaderItem from "./HeaderItem";
import Mode from "../Mode";
import Loader from "../Loader";
import { Link, Redirect } from "react-router-dom";
import {useEffect} from "react";
import "../../styles/header.scss";
import { useState } from "react";

const Header = (props) => {
	const [redirect, setRedirect] = useState("");
	const [query, setQuery] = useState("");
	return (
		<div className="navbar">
			{redirect && <Redirect to={redirect}/>}
			<div className="navbar__navigation navbar__navigation__responsive" style={{display: "none"}}>
				{props.isLoading ? <Loader /> : <Mode {...props} />}
				<div className="menu mode-toggle"
						onClick={(e) => {
							props.setMenu(!props.menu);
						}}
						aria-label="Main Menu">
					<svg width="28" height="28" viewBox="0 0 100 100" style={{pointerEvents: "none"}}>
						<path className="line line1"
							  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"/>
						<path className="line line2" d="M 20,50 H 80"/>
						<path className="line line3"
							  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"/>
					</svg>
				</div>

			</div>
			<div className="navbar__navigation">
				{props.isLoading ? <Loader /> : <Mode {...props} />}
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
					onClick={() => props.setShowProfile(!props.showProfile)}
				/>
				{props.showProfile && (
					<div className="profile-dropdown" onClick={() => {props.setShowProfile(false);}}>
                        {props.user.id ? (<div className="profile-dropdown__wrapper">
                            <div className="profile-dropdown__item">
                                <Link to="/accounts/dashboard">مدیریت</Link>
                            </div>
                            <div className="profile-dropdown__item">
                                <Link to={"/accounts/view/" + props.user.username}>پروفایل</Link>
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
				{/*<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"*/}
				{/*	 stroke="#9F9F9F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"*/}
				{/*	 className="feather feather-bell">*/}
				{/*	<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>*/}
				{/*	<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>*/}
				{/*</svg>*/}
				<form onSubmit={(e) => {
					e.preventDefault();
					setRedirect(`/pastes/search/${query}`);
				}} className="features__search">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
						 stroke="#808080" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
						 className="feather feather-search">
						<circle cx="11" cy="11" r="8"></circle>
						<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
					</svg>
					{/*<img width="25px" height="25px" src="/images/search.svg" alt="" />*/}
					<input name="query" onChange={(e) => {
						setQuery(e.target.value);
					}} value={query} placeholder="چیزی را تایپ کنید"></input>
				</form>
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
