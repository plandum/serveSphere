import { Outlet } from "react-router-dom";

import TopSideBar2 from "@/components/shared/TopSideBar2.tsx";

const RootLayout = () => {
  return (
    <div className="w-full ">
      <TopSideBar2 />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
