import React from "react";

// All types/interfaces/enums will be stored here

// -- Types --

// Navbar
export type NavBarProps = {
  routes: Array<RouteView>;
};

// -- Interfaces --

export interface RouteView {
  text: string;
  destination: string;
  acceptPaths?: string | string[];
  component: React.ReactNode;
  requiredState: RequiredUserState;
}

// -- Enums --

export enum RequiredUserState {
  All = "ALL",
  Logged = "LOGGED",
  Guest = "GUEST",
}
