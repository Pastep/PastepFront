import "./base.scss";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useEffect, useState} from "react";

// Components
import Header from "./components/header/Header";

// Pages
import Home from "./pages/Home";
import BestRating from "./pages/BestRating";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import NewPaste from "./pages/NewPaste";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import {isEmpty} from "codemirror/src/util/misc";

const backend = "http://localhost:5000";


function App() {
    const [pastes, setPastes] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const handleTokenChange = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        const getUser = async () => {
            const data = await fetchUser();
            setUser(data);
            console.log(data);
        }
        getUser();
    }
    const [user, setUser] = useState({});
    const headerOptions = {
        Authorization: token,
        "Content-Type": "application/json"
    };
    const fetchPastes = async () => {
        const res = await fetch(backend + "/pastes/all");
        const data = await res.json();
        return data;
    }
    const fetchLogin = async (username, password) => {
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
        return data
    }
    const fetchUser = async () => {
        const res = await fetch(backend + "/accounts/get?token=" + localStorage.getItem("token") , {
            method: "GET",
        });
        const data = await res.json();
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
        if (token !== ""){
            getUser();
        }

    }, []);

    return (
        <Router>
            <Header
                backend={backend}
                user={user}
                toggleMode={toggleMode}
                currentMode={currentMode}
            />
            <Switch>
                <Route path={["/best-rating", "/bestrating"]} exact>
                    <BestRating/>
                </Route>
                <Route path={["/team", "/about", "/aboutus"]}>
                    <Team/>
                </Route>
                <Route path={["/new-paste", "/newpaste"]}>
                    <NewPaste user={user} token={token} currentMode={currentMode}/>
                </Route>
                <Route path="/accounts/dashboard">
                    <Dashboard handleTokenChange={handleTokenChange} backend={backend} user={user} token={token} currentMode={currentMode}/>
                </Route>
                <Route path="/accounts/login">
                    <Login token={token} user={user} setToken={handleTokenChange} fetchLogin={fetchLogin}/>
                </Route>
                <Route path="/accounts/register">
                    <Register token={token}/>
                </Route>
                <Route path="/accounts/view/:username">
                    <Profile currentMode={currentMode}/>
                </Route>
                <Route path={["/", "/home", "/index"]}>
                    <Home fetchPastes={fetchPastes} currentMode={currentMode} backend={backend}/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
