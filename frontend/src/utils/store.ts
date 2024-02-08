/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// user Types
type UserType = {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: string;
  isSignedUp?: boolean;
  sideBarDriverJs?: boolean;
  leaderboardDriverJs?: boolean;
  testDriverJs?: boolean;
  searchDriverJs?: boolean;
  token: string;
};

const defaultParam: UserType = {
  _id: "",
  name: "",
  email: "",
  username: "",
  role: "",
  isSignedUp: false,
  sideBarDriverJs: true,
  leaderboardDriverJs: true,
  testDriverJs: true,
  searchDriverJs: true,
  token: "",
};

type UserDetailsFnType = {
  user: UserType;
  setUserDetails: (userDetails: UserType) => void;
  updateTutorial: (tutorialName: keyof UserType) => void;
  logoutUser: () => void;
};

export const useUserDetails = create<UserDetailsFnType>((set) => {
  const storedUserDetails = sessionStorage.getItem("userDetails");
  return {
    user: storedUserDetails ? JSON.parse(storedUserDetails) : defaultParam,
    setUserDetails: (userDetails: UserType) =>
      set(() => {
        sessionStorage.removeItem("userDetails");
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        return {
          user: userDetails,
        };
      }),

    updateTutorial: (tutorialName: keyof UserType) =>
      set((state: any) => {
        state.user[tutorialName] = false;
        sessionStorage.removeItem("userDetails");
        sessionStorage.setItem("userDetails", JSON.stringify(state.user));
        return {
          user: state.user,
        };
      }),

    logoutUser: () =>
      set(() => {
        sessionStorage.removeItem("userDetails");
        return {
          user: defaultParam,
        };
      }),
  };
});
