import { Outlet } from "react-router-dom";
import SideBarAndOpenCloseContainer from "@/components/SideBarAndOpenCloseContainer";

const DashboardLayout = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#0F0F0F]">
      {/* Container */}
      <div className="lg:w-[90%] w-full h-full rounded-sm lg:h-[95%] flex relative bg-white overflow-x-hidden">
        <SideBarAndOpenCloseContainer />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
