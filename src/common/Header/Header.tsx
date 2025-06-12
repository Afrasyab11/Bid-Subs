import { Menu, Bell, Sun } from "lucide-react";
import { Icons } from "@/assets/Index";
import Image from "../image/Image";
import { Link } from "react-router-dom";
import { ROUTES_ENUM } from "@/constants/routes.constant";
import { useSession } from "@/sessionManager/SessionContext";
interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen?: any;
  setSidebarOpen?: any;
}
export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { toggleTheme } = useSession();
  return (
    <header
      className={`
          flex items-center justify-between bg-semi_blue dark:bg-semi-dark p-4  border-gray-200 
        `}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-slate-700"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4 ">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-colors "
        >
          <Sun size={20} className=" text-blue" />
        </button>
        <button className="p-2 rounded-lg   transition-colors">
          <Bell size={20} className="text-blue dark:text-white" />
          <span className=" -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-12 bg-white h-12  rounded-full flex items-center justify-center">
            <Link to={ROUTES_ENUM?.ROOT}>
              <Image src={Icons?.dash_user} className="z-" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium text-black dark:text-white">
              Muhammad Afrasyab
            </div>
            <div className="text-xs text-gray dark:text-white">
              Premium User
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
