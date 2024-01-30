/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// user Types
type UserType = {
  fullname: string;
  email: string;
  username: string;
  isSignedUp?: boolean;
  sideBarDriverJs?: boolean;
  leaderboardDriverJs?: boolean;
  testDriverJs?: boolean;
};

const defaultParam: UserType = {
  fullname: "",
  email: "",
  username: "",
  isSignedUp: false,
  sideBarDriverJs: true,
  leaderboardDriverJs: true,
  testDriverJs: true,
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
