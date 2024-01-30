/* eslint-disable react-hooks/rules-of-hooks */
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function callSideBarDriver() {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#sidebar",
        popover: {
          title: "Sidebar",
          description:
            "From here you can navigate to your account, leaderboard and tests section",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#account",
        popover: {
          title: "Account",
          description:
            "Account section where you can see your account details and edit it!",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#leaderboard",
        popover: {
          title: "Leaderboard",
          description: "Leaderboard here you can see your ranking😉",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#tests",
        popover: {
          title: "Test",
          description:
            "This is where you can give your test! Make sure to submit on time❗",
          align: "start",
        },
      },
      {
        element: "#logoutacc",
        popover: {
          title: "Logout",
          description: "By clicking here you can logout",
          side: "top",
          align: "start",
        },
      },
    ],
  });

  driverObj.drive();
}

export function callLeaderBoardDriver() {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: "#title",
        popover: {
          title: "Leaderboard",
          description: "This is Leaderboard, here you can see all the rankings",
          side: "top",
          align: "start",
        },
      },
      {
        element: "#rankingTable",
        popover: {
          title: "Ranking Table",
          description:
            "Ranking table here you all the students ranking get displayed",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#rank",
        popover: {
          title: "Rank",
          description: "Based on total score students ranking gets decide",
          side: "bottom",
          align: "start",
        },
      },
    ],
  });

  driverObj.drive();
  return true;
}
