import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import "./styles/global/base.scss";
import { Dispatcher, UserState } from "./types";
import { useEffect } from "react";
import { useState } from "react";
import { BestRating } from "./components/BestRating";
import { Team } from "./components/Team";

function GuestState() {
  return (
    <Router>
      <NavBar userState={UserState.Guest} />
      <div className="content__wrapper">
        <Route path={["/", "/home", "/index"]} exact component={Home} />
        <Route path="/best-rating" exact component={BestRating} />
        <Route path="/team" exact component={Team} />
        <Route path="/login" exact component={Home} />
        <Route path="/register" exact component={Home} />
      </div>
    </Router>
  );
}

function LoggedState() {
  return (
    <Router>
      <NavBar userState={UserState.Logged} />
      <div className="content__wrapper">
        <Route path={["/", "/home", "/index"]} exact component={Home} />
        <Route path="/best-rating" exact component={BestRating} />
        <Route path="/team" exact component={Team} />
      </div>
    </Router>
  );
}

const dispatcher: Dispatcher = {
  [UserState.Guest]: <GuestState />,
  [UserState.Logged]: <LoggedState />,
};

function App() {
  const [userState, setUserState] = useState(UserState.Guest);
  useEffect(() => {
    // TODO: Use fetch classes later
    setUserState(UserState.Logged);
  }, []);

  return dispatcher[userState];
}

export default App;
