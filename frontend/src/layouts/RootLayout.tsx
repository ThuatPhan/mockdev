import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-[17%]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
