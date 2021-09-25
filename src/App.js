import "./base.scss";
import "./styles/responsive.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
// Components
import Header from "./components/header/Header";
import ResponsiveMenu from "./components/ResponsiveMenu";
// Pages
import Home from "./pages/Home";
import BestRating from "./pages/BestRating";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import NewPaste from "./pages/NewPaste";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ViewPaste from "./pages/ViewPaste";
import EditPaste from "./pages/EditPaste";
import Search from "./pages/Search";
import FetchRoutes from "./Classes/FetchRoutes";
import FetchFunctions from "./Classes/FetchFunctions";
const backend = "http://localhost:5000";
const fetchRoutes = new FetchRoutes({
	backend,
});
const fetchFunctions = new FetchFunctions({
	defaultHeaders: {
		Authorization: "",
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	fetchRoutes: fetchRoutes,
});
global.fetchFunction = fetchFunctions;
function App() {
	const [isLoading, setLoading] = useState(false);
	const [menu, setMenu] = useState(false);
	const [showProfile, setShowProfile] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [error, setError] = useState("");

	const handleTokenChange = (newToken) => {
		setToken(newToken);
		localStorage.setItem("token", newToken);
		const getUser = async () => {
			const data = await fetchUser();
			setUser(data);
		};
		getUser();
	};
	const [user, setUser] = useState({});
	fetchFunctions.defaultHeaders.Authorization = `Bearer ${token}`;
	const fetchCreateComment = async (paste, content) => {
		setLoading(true);
		const { data } = await fetchFunctions.createComment({ paste, content });
		setLoading(false);
		if (data.message === "Token is incorrect.") {
			setError("لطفا لاگین کنید");
			setTimeout(() => {
				setError("");
			}, 2000);
		}
		return data;
	};
	const fetchComments = async (pasteId) => {
		setLoading(true);
		const { data } = await fetchFunctions.comments(pasteId);
		setLoading(false);
		return data;
	};
	const fetchPasswordReset = async (body) => {
		setLoading(true);
		const { data } = await fetchFunctions.passwordReset(body);
		setLoading(false);
		return data;
	};
	const fetchDeleteComment = async (id) => {
		setLoading(true);
		const { data } = await fetchFunctions.deleteComment(id);
		setLoading(false);
		return data;
	};
	const fetchLanguages = async () => {
		setLoading(true);
		const { data } = await fetchFunctions.languages();
		setLoading(false);
		return data;
	};
	const fetchUpdatePaste = async (body) => {
		setLoading(true);
		const { data } = await fetchFunctions.pasteUpdate(body);
		setLoading(false);
		return data;
	};
	const fetchFollowers = async (user) => {
		setLoading(true);
		const { data } = await fetchFunctions.followers(user);
		setLoading(false);
		return data;
	};
	const fetchFollowings = async (user) => {
		setLoading(true);
		const { data } = await fetchFunctions.followings(user);
		setLoading(false);
		return data;
	};
	const fetchToggleFollow = async (target) => {
		setLoading(true);
		const { data } = await fetchFunctions.toggleFollow(target);
		setLoading(false);
		return data;
	};
	const deletePaste = async (id) => {
		setLoading(true);
		const { data } = await fetchFunctions.deletePaste(id);
		setLoading(false);
		return data;
	};
	const fetchPaste = async ({ id, name, password, isRaw = false }) => {
		setLoading(true);
		const { data } = await fetchFunctions.paste({ id, name, password, isRaw });
		setLoading(false);
		return data;
	};
	const fetchUserData = async ({ name, value }) => {
		setLoading(true);
		const { data } = await fetchFunctions.user({ name, value });
		setLoading(false);
		return data;
	};
	const fetchPasteCreate = async (body) => {
		setLoading(true);
		const { data } = await fetchFunctions.createPaste(body);
		setLoading(false);
		return data;
	};
	const fetchAvatarUpdate = async (file) => {
		setLoading(true);
		const { data } = fetchFunctions.avatarUpdate(file);
		return data;
	};
	const fetchUserUpdate = async (body) => {
		setLoading(true);
		const { data } = await fetchFunctions.userUpdate(body);
		setLoading(false);
		return data;
	};
	const fetchRegister = async (username, persianUsername, email, password) => {
		setLoading(true);
		const { data } = await fetchFunctions.register({
			username,
			persianUsername,
			email,
			password,
		});
		setLoading(false);
		return data;
	};
	const fetchSearchPastes = async ({
		limit,
		shuffle = "no",
		latest = "no",
		title,
		user,
	}) => {
		setLoading(true);
		const { data } = await fetchFunctions.searchPaste({
			limit,
			shuffle,
			latest,
			title,
			user,
		});
		setLoading(false);
		return data;
	};
	const fetchPastes = async ({ limit, shuffle = "no", latest = "no" }) => {
		setLoading(true);
		const { data } = await fetchFunctions.pastes({ limit, shuffle, latest });
		setLoading(false);
		return data;
	};
	const fetchPopularPastes = async ({ limit }) => {
		setLoading(true);
		const { data } = await fetchFunctions.trendingPastes(limit);
		setLoading(false);
		return data;
	};
	const pasteLikeToggle = async (pasteId) => {
		setLoading(true);
		const { data } = await fetchFunctions.likeToggle(pasteId);
		setLoading(false);
		if (data.message === "Token is incorrect.") {
			setError("لطفا لاگین کنید");
			setTimeout(() => {
				setError("");
			}, 2000);
		} else if (data.message === "Too many likes from this ip") {
			setError("Rate Limited");
			setTimeout(() => {
				setError("");
			}, 2000);
		}
		return data;
	};
	const fetchUserTrendingPastes = async ({ id, limit }) => {
		setLoading(true);
		const { data } = await fetchFunctions.userTrendingPastes({ id, limit });
		setLoading(false);
		return data;
	};
	const fetchUserPastes = async (id) => {
		setLoading(true);
		const { data } = await fetchFunctions.userPastes(id);
		setLoading(false);
		return data;
	};
	const fetchLogin = async (username, password) => {
		setLoading(true);
		const body = {
			password: password,
		};
		if (
			username.match("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")
		) {
			body.email = username;
		} else {
			body.username = username;
		}
		const { data } = await fetchFunctions.login(body);
		setLoading(false);
		return data;
	};
	const fetchUser = async () => {
		setLoading(true);
		const { data } = await fetchFunctions.userToken(
			localStorage.getItem("token")
		);
		setLoading(false);
		return data;
	};
	// currentMode state
	const [currentMode, setCurrentMode] = useState("");

	const toggleMode = () => {
		const newMode = currentMode === "dark" ? "light" : "dark";
		setCurrentMode(newMode);
		localStorage.setItem("theme", newMode);
		document.body.style.transition = "0.5s";
		document.querySelector("#root").style.transition = "0.5s";
		if (newMode === "dark") {
			document.body.setAttribute("theme", "dark");
			setCurrentMode("dark");
		} else {
			document.body.setAttribute("theme", "light");
			setCurrentMode("light");
		}
		document.body.style.transition = "0";
		document.querySelector("#root").style.transition = "0";
	};

	useEffect(() => {
		document.body.style.transition = "0.5s";
		document.querySelector("#root").style.transition = "0.5s";
		if (localStorage.getItem("theme") === "dark") {
			document.body.setAttribute("theme", "dark");
			setCurrentMode("dark");
		} else {
			document.body.setAttribute("theme", "light");
			setCurrentMode("light");
		}
		document.body.style.transition = "0";
		document.querySelector("#root").style.transition = "0";

		const getUser = async () => {
			const data = await fetchUser();
			setUser(data);
		};
		if (token !== "") {
			getUser();
		}
	}, []);
	// const responsiveMenuItemClick = (e) => {
	// 	const menu = document.querySelector(".menu-responsive");
	// 	menu.style.left = "100%";
	// 	window.location.href = e.target.getAttribute("to");
	// };

	return (
		<Router>
			{error && (
				<div className="onScreenError">
					<div className="error">{error}</div>
				</div>
			)}
			<ResponsiveMenu menu={menu} setMenu={setMenu} />
			<Header
				fetchSearchPastes={fetchSearchPastes}
				backend={backend}
				user={user}
				toggleMode={toggleMode}
				currentMode={currentMode}
				isLoading={isLoading}
				menu={menu}
				setMenu={setMenu}
				showProfile={showProfile}
				setShowProfile={setShowProfile}
			/>
			<Switch>
				<Route path={["/best-rating", "/bestrating"]} exact>
					<BestRating />
				</Route>
				<Route path={["/team", "/about", "/aboutus"]}>
					<Team />
				</Route>

				<Route path="/pastes/search/:title">
					<Search
						fetchSearchPastes={fetchSearchPastes}
						backend={backend}
						pasteLikeToggle={pasteLikeToggle}
						currentMode={currentMode}
					/>
				</Route>
				<Route path="/pastes/edit/:id">
					<EditPaste
						fetchUpdatePaste={fetchUpdatePaste}
						currentUser={user}
						pasteLikeToggle={pasteLikeToggle}
						backend={backend}
						currentMode={currentMode}
						user={user}
						fetchPaste={fetchPaste}
					/>
				</Route>
				<Route path={["/pastes/view/:name", "/pastes/:name"]}>
					<ViewPaste
						fetchDeleteComment={fetchDeleteComment}
						fetchCreateComment={fetchCreateComment}
						pasteLikeToggle={pasteLikeToggle}
						backend={backend}
						currentMode={currentMode}
						user={user}
						fetchPaste={fetchPaste}
						fetchComments={fetchComments}
					/>
				</Route>
				<Route path={["/new-paste", "/newpaste"]}>
					<NewPaste
						fetchLanguages={fetchLanguages}
						fetchPasteCreate={fetchPasteCreate}
						user={user}
						currentMode={currentMode}
					/>
				</Route>
				<Route path="/accounts/dashboard">
					<Dashboard
						deletePaste={deletePaste}
						setToken={setToken}
						fetchAvatarUpdate={fetchAvatarUpdate}
						setUser={setUser}
						fetchUserUpdate={fetchUserUpdate}
						handleTokenChange={handleTokenChange}
						backend={backend}
						user={user}
						token={token}
						currentMode={currentMode}
						fetchUserPastes={fetchUserPastes}
						pasteLikeToggle={pasteLikeToggle}
						fetchFollowers={fetchFollowers}
						fetchFollowings={fetchFollowings}
					/>
				</Route>
				<Route path="/accounts/forgot-password">
					<ForgotPassword
						token={token}
						user={user}
						fetchPasswordReset={fetchPasswordReset}
					/>
				</Route>
				<Route path="/accounts/login">
					<Login
						token={token}
						user={user}
						setToken={handleTokenChange}
						fetchLogin={fetchLogin}
					/>
				</Route>
				<Route path="/accounts/register">
					<Register user={user} fetchRegister={fetchRegister} />
				</Route>
				<Route path="/accounts/view/:username">
					<Profile
						fetchFollowings={fetchFollowings}
						currentUser={user}
						fetchToggleFollow={fetchToggleFollow}
						fetchFollowers={fetchFollowers}
						pasteLikeToggle={pasteLikeToggle}
						currentMode={currentMode}
						fetchUserData={fetchUserData}
						fetchUserPastes={fetchUserPastes}
						backend={backend}
						fetchUserTrendingPastes={fetchUserTrendingPastes}
					/>
				</Route>
				<Route path={["/", "/home", "/index"]}>
					<Home
						pasteLikeToggle={pasteLikeToggle}
						fetchPastes={fetchPastes}
						currentMode={currentMode}
						backend={backend}
						fetchPopularPastes={fetchPopularPastes}
					/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
