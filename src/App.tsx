import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import { NavBar } from "./components/NavBar";
import { routes } from "./routing";
import "./styles/global/base.scss";

function App() {
  var routeComponents = [];
  for (let i = 0; i < routes.length; i++) {
    routeComponents.push(
      <Route
        path={routes[i].acceptPaths || routes[i].destination}
        exact
        key={i}
      >
        {routes[i].component}
      </Route>
    );
  }
  return (
    <Router>
      <NavBar routes={routes} />
      <div className="content__wrapper">
        <Switch>{routeComponents}</Switch>
      </div>
    </Router>
  );
}

export default App;
