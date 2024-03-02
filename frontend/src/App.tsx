import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import LeaderBoard from "./pages/LeaderBoard";
import TestsList from "./pages/TestsList";
import DashBoardLayout from "./Layout/DashBoard";
import CreateTest from "./pages/CreateTest";
import TeachersTable from "./pages/TeachersTable";
import Announcment from "./pages/Announcment";
import BookmarkTests from "./pages/Bookmark";
import TestPageOutlet from "./pages/TestPageOutlet";
import StudentProfilePage from "./pages/StudentProfile";
import CreateAnnuncment from "./pages/CreateAnnuncment";
import TeacherProfilePage from "./pages/TeacherProfile";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Requests from "./pages/Requests";
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
        path: "requests",
        element: <Requests />,
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
        path: "test/:testId",
        element: <TestPageOutlet />,
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
        path: "search/student",
        element: <Students />,
      },
      {
        path: "search/teacher",
        element: <Teachers />,
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
        element: <StudentProfilePage />,
      },
      {
        path: "teacher/:id",
        element: <TeacherProfilePage />,
      },
      {
        path: "create-announcment",
        element: <CreateAnnuncment />,
      },
      {
        path: "/dashboard/*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default appRouter;
