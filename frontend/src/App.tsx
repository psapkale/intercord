import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LeaderBoard from "./pages/LeaderBoard";
import Test from "./pages/Test";
import DashBoardLayout from "./Layout/DashBoard";
import StudentProfile from "./pages/StudentProfile";
// import { lazy } from "react";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "account",
        element: <ProfilePage />,
      },
      {
        path: "leaderboard",
        element: <LeaderBoard />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "student/:id",
        element: <StudentProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default appRouter;
