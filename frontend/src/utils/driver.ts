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
  return true;
}
