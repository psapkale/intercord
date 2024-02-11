import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LeaderBoard from "./pages/LeaderBoard";
import TestsList from "./pages/TestsList";
import DashBoardLayout from "./Layout/DashBoard";
import StudentProfile from "./pages/StudentProfile";
import CreateTest from "./pages/CreateTest";
import TeachersTable from "./pages/TeachersTable";
import Stundents from "./pages/Students";
import TestPage from "./pages/TestPage";
import Announcment from "./pages/Announcment";
import BookmarkTests from "./pages/Bookmark";
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
        element: <TestsList />,
      },
      {
        path: "test/testId",
        element: <TestPage />,
      },
      {
        path: "createtest",
        element: <CreateTest />,
      },
      {
        path: "teachers",
        element: <TeachersTable />,
      },
      {
        path: "search",
        element: <Stundents />,
      },
      {
        path: "announcment",
        element: <Announcment />,
      },
      {
        path: "bookmark",
        element: <BookmarkTests />,
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
