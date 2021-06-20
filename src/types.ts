// All types/interfaces/enums will be stored here

// -- Enums --

export enum UserState {
  Logged = "LOGGED",
  Guest = "GUEST",
}

// -- Types --

// Navbar
export type NavBarProps = {
  userState: UserState;
};

export type PasteProps = {
  userName: string;
  userLocation: string;
  profilePic: string;
  code: string;
  title: string;
  description: string;
};

// -- Interfaces --

export interface Dispatcher {
  [UserState.Guest]: JSX.Element;
  [UserState.Logged]: JSX.Element;
}
