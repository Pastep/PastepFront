import "./base.scss";
import "./styles/responsive.css";

import {BrowserRouter as Router, Redirect, Link, Route, Switch} from "react-router-dom";
import {useEffect, useState} from "react";
// Components
import Header from "./components/header/Header";
import ResponsiveMenu from "./components/ResponsiveMenu";
import HeaderItem from "./components/header/HeaderItem";

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
import Loader from "./components/Loader";
import Mode from "./components/Mode";

const backend = "http://localhost:5000";


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
        }
        getUser();
    }
    const [user, setUser] = useState({});
    const headerOptions = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
    };
    const fetchCreateComment = async (paste, content) => {
        setLoading(true);
        const result = await fetch(`${backend}/pastes/comments/create`, {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify({
                paste: paste,
                content: content
            })
        });
        const data = await result.json();
        setLoading(false);
        if (data.message === "Token is incorrect.") {
            setError("لطفا لاگین کنید");
            setTimeout(() => {
                setError("");
            }, 2000)
        }
        return data;
    };
    const fetchComments = async (pasteId) => {
        setLoading(true);
        const result = await fetch(`${backend}/pastes/comments/all?paste=${pasteId}`);
        const data = await result.json();
        setLoading(false);
        return data;
    };
    const fetchPasswordReset = async (body) => {
        setLoading(true);
        const result = await fetch(`${backend}/accounts/password/reset`, {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify(body)
        });
        const data = await result.json();
        setLoading(false);
        return data;
    };
    const fetchDeleteComment = async (id) => {
        setLoading(true);
        const result = await fetch(`${backend}/pastes/comments/delete`, {
            method: "DELETE",
            headers: headerOptions,
            body: JSON.stringify({
                id: id
            })
        });
        const data = await result.json();
        setLoading(false);
        return data;
    };
    const fetchLanguages = async () => {
        setLoading(true);
        const result = await fetch(`${backend}/languages/all`);
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchUpdatePaste = async (body) => {
        setLoading(true);
        const result = await fetch(`${backend}/pastes/update`, {
            method: "PUT",
            headers: headerOptions,
            body: JSON.stringify(body)
        })
        const data = await result.json();
        setLoading(false);
        return data;
    };
    const fetchFollowers = async (user) => {
        setLoading(true);
        const result = await fetch(backend + `/accounts/people/followers?user=${user}`);
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchFollowings = async (user) => {
        setLoading(true);
        const result = await fetch(backend + `/accounts/people/followings?user=${user}`);
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchToggleFollow = async (target) => {
        setLoading(true);
        const result = await fetch(backend + `/accounts/people/toggleFollow`, {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify({target: target})
        });
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const deletePaste = async (id) => {
        setLoading(true);
        const result = await fetch(backend + "/pastes/delete", {
            method: "DELETE",
            headers: headerOptions,
            body: JSON.stringify({id: id})
        });
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchPaste = async ({id, name, password, isRaw = false}) => {
        setLoading(true);
        const query = id ? `id=${id}` : `name=${name}`
        const result = await fetch(backend + `/pastes/read?isRaw=${isRaw ? "yes" : "no"}&password=${password}&${query}`, {
            method: "GET",
            headers: headerOptions
        });
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchUserData = async (body) => {
        setLoading(true);
        const result = await fetch(backend + "/accounts/get?" + body.name + "=" + body.value, {
            headers: headerOptions
        });
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchPasteCreate = async (body) => {
        setLoading(true);
        const result = await fetch(backend + "/pastes/create", {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify(body)
        });
        const data = await result.json();
        setLoading(false);
        return data;
    }
    const fetchAvatarUpdate = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("avatar", file, "profile.png");
        const result = await fetch(backend + "/accounts/avatar", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token
            },
            body: formData
        });
        const data = await result.json();
        return data;
    }
    const fetchUserUpdate = async (body) => {
        setLoading(true);
        const res = await fetch(backend + "/accounts/update", {
            method: "PUT",
            headers: headerOptions,
            body: JSON.stringify(body)
        });
        const data = await res.json();
        setLoading(false);
        return data;
    }
    const fetchRegister = async (username, persianUsername, email, password) => {
        setLoading(true);
        const body = {
            username: username,
            persianUsername: persianUsername,
            email: email,
            password: password
        }
        const res = await fetch(backend + "/accounts/create", {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify(body)
        });
        const data = await res.json();
        setLoading(false);
        return data;
    }
    const fetchSearchPastes = async ({limit, shuffle = "no", latest = "no", title, user}) => {
        setLoading(true);
        let query = backend + "/pastes/search?title=" + title;
        if (limit) {
            query += "&limit=" + limit;
        }
        if (shuffle) {
            query += "&shuffle=yes&";
        }
        if (latest) {
            query += "&latest=yes&";
        }
        if (user) {
            query += "&user=" + user
        }
        const res = await fetch(query, {
            headers: headerOptions
        });
        const data = await res.json();
        setLoading(false);
        return data;
    }
    const fetchPastes = async ({limit, shuffle = "no", latest = "no"}) => {
        setLoading(true);
        const res = await fetch(backend + `/pastes/all?limit=${limit}&shuffle=${shuffle}&latest=${latest}`, {
            headers: headerOptions
        });
        const data = await res.json();
        setLoading(false);
        return data;
    };
    const pasteLikeToggle = async (pasteId) => {
        setLoading(true);
        const res = await fetch(backend + "/pastes/likes/toggle", {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify({paste: pasteId})
        });
        const data = await res.json();
        setLoading(false);
        if (data.message === "Token is incorrect.") {
            setError("لطفا لاگین کنید");
            setTimeout(() => {
                setError("");
            }, 2000)
        }
        return data;
    }
    const fetchUserPastes = async (id) => {
        setLoading(true);
        const res = await fetch(backend + "/pastes/all?user=" + id, {
            headers: headerOptions
        });
        const data = await res.json();
        setLoading(false);
        return data;
    }
    const fetchLogin = async (username, password) => {
        setLoading(true);
        let body = {
            password: password
        };
        if (username.match("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")) {
            body.email = username;
        } else {
            body.username = username;
        }
        const res = await fetch(backend + "/accounts/login", {
            method: "POST",
            headers: headerOptions,
            body: JSON.stringify(body)
        })
        const data = await res.json();
        setLoading(false);
        return data
    }
    const fetchUser = async () => {
        setLoading(true);
        const res = await fetch(backend + "/accounts/get?token=" + localStorage.getItem("token"), {
            method: "GET",
        });
        const data = await res.json();
        setLoading(false);
        return data;
    }
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
        }
        if (token !== "") {
            getUser();
        }

    }, []);
    const responsiveMenuItemClick = (e) => {
        const menu = document.querySelector(".menu-responsive");
        menu.style.left = "100%";
        window.location.href = e.target.getAttribute("to");
    }


    return (
        <Router>
            {error && <div className="onScreenError">
                <div className="error">
                    {error}
                </div>
            </div>
            }
            <ResponsiveMenu menu={menu} setMenu={setMenu}/>
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
                    <BestRating/>
                </Route>
                <Route path={["/team", "/about", "/aboutus"]}>
                    <Team/>
                </Route>

                <Route path="/pastes/search/:title">
                    <Search fetchSearchPastes={fetchSearchPastes} backend={backend} pasteLikeToggle={pasteLikeToggle}
                            currentMode={currentMode}
                            backend={backend}/>
                </Route>
                <Route path="/pastes/edit/:id">
                    <EditPaste fetchUpdatePaste={fetchUpdatePaste} currentUser={user} pasteLikeToggle={pasteLikeToggle}
                               backend={backend} currentMode={currentMode} user={user} fetchPaste={fetchPaste}/>
                </Route>
                <Route path={["/pastes/view/:name", "/pastes/:name"]}>
                    <ViewPaste fetchDeleteComment={fetchDeleteComment} fetchCreateComment={fetchCreateComment}
                               pasteLikeToggle={pasteLikeToggle} backend={backend} currentMode={currentMode} user={user}
                               fetchPaste={fetchPaste}
                               fetchComments={fetchComments}/>
                </Route>
                <Route path={["/new-paste", "/newpaste"]}>
                    <NewPaste fetchLanguages={fetchLanguages} fetchPasteCreate={fetchPasteCreate} user={user}
                              currentMode={currentMode}/>
                </Route>
                <Route path="/accounts/dashboard">
                    <Dashboard deletePaste={deletePaste} setToken={setToken} fetchAvatarUpdate={fetchAvatarUpdate}
                               setUser={setUser}
                               fetchUserUpdate={fetchUserUpdate} handleTokenChange={handleTokenChange} backend={backend}
                               user={user} token={token}
                               currentMode={currentMode} fetchUserPastes={fetchUserPastes}
                               pasteLikeToggle={pasteLikeToggle} fetchFollowers={fetchFollowers}
                               fetchFollowings={fetchFollowings}/>
                </Route>
                <Route path="/accounts/forgot-password">
                    <ForgotPassword token={token} user={user} fetchPasswordReset={fetchPasswordReset}/>
                </Route>
                <Route path="/accounts/login">
                    <Login token={token} user={user} setToken={handleTokenChange} fetchLogin={fetchLogin}/>
                </Route>
                <Route path="/accounts/register">
                    <Register user={user} fetchRegister={fetchRegister}/>
                </Route>
                <Route path="/accounts/view/:username">
                    <Profile fetchFollowings={fetchFollowings} currentUser={user} fetchToggleFollow={fetchToggleFollow}
                             fetchFollowers={fetchFollowers}
                             pasteLikeToggle={pasteLikeToggle} currentMode={currentMode} fetchUserData={fetchUserData}
                             fetchUserPastes={fetchUserPastes} backend={backend}/>
                </Route>
                <Route path={["/", "/home", "/index"]}>
                    <Home pasteLikeToggle={pasteLikeToggle} fetchPastes={fetchPastes} currentMode={currentMode}
                          backend={backend}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
