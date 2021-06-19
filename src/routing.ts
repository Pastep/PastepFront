import { BestRating } from "./components/BestRating";
import { Home } from "./components/Home";
import { Team } from "./components/Team";
import { RequiredUserState, RouteView } from "./types";

// Note: acceptPaths has to include destination as well. It works like aliases to a route

export const routes: Array<RouteView> = [
  {
    text: "خانه",
    destination: "/",
    acceptPaths: ["/", "/home", "/index"],
    component: Home,
    requiredState: RequiredUserState.All,
  },
  {
    text: "محبوب ترین ها",
    destination: "/favorites",
    component: BestRating,
    requiredState: RequiredUserState.All,
  },
  {
    text: "تیم ما",
    destination: "/team",
    component: Team,
    requiredState: RequiredUserState.All,
  },
];
