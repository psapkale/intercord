import "./App.css";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import { lazy } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router-dom";
import SideBar from "./components/ui/SideBar";
import ProfilePage from "./pages/ProfilePage";
import LeaderBoard from "./pages/LeaderBoard";
import imgBg from "./assets/banner.png";
import Test from "./pages/Test";
import { ArrowLeft } from "lucide-react";
// main pages
const Dashboard = lazy(() => import("./pages/Dashboard"));

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

const DashboardLayout = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <Link to={"/"}>
        <button className="w-[3rem] h-[3rem] rounded-full bg-black flex justify-center items-center absolute top-4 left-4">
          <ArrowLeft className="text-white" />
        </button>
      </Link>
      <img src={imgBg} className="w-full h-full object-contain" alt="" />
      <div className="w-[80%] h-[80%] flex border absolute glass">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

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
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
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
    ],
  },
]);

export default appRouter;
