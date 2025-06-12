import { Header } from "@/common/Header/Header";
import { Outlet } from "react-router-dom";
import {  useState } from "react";
import { Sidebar } from "@/common/sidebar/Sidebar";
export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <div className="w-full flex h-screen overflow-hidden bg-semi_blue dark:bg-semi-dark text-white">
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar}  />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>

    // <div className={`flex h-screen bg-semi_blue dark:bg-semi-dark text-white"`}>
    //   <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    //   <div className="flex-1 flex flex-col overflow-hidden">
    //     <Header toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} />
    //     <Outlet />
    //   </div>
    // </div>
  );
};
