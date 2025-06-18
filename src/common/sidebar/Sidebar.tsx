import { RxDashboard } from "react-icons/rx";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { PiNotificationFill } from "react-icons/pi";
import Image from "../image/Image";
import { Icons } from "@/assets/Index";
import { X } from "lucide-react";
import { useSession } from "@/sessionManager/SessionContext";
import Logo from "../Logo";
interface SidebarProps {
  toggleSidebar: () => void;
  isSidebarOpen?: any;
  setSidebarOpen?: any;
}
interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  section?: string;
}
// Sidebar items
const sidebarItems: SidebarItem[] = [
  { icon: <RxDashboard size={20} />, label: "Dashboard" },
  { icon: <LuBriefcaseBusiness size={20} />, label: "Projects" },
  { icon: <PiNotificationFill size={20} />, label: "Takeoffs" },
  { icon: <PiNotificationFill size={20} />, label: "Estimates" },
  { icon: <PiNotificationFill size={20} />, label: "Proposals" },
  { icon: <PiNotificationFill size={20} />, label: "Templates" },
  { icon: <PiNotificationFill size={20} />, label: "Pricing Database" },
  { icon: <PiNotificationFill size={20} />, label: "Clients" },
  { icon: <PiNotificationFill size={20} />, label: "Team" },
  {
    icon: <TbBrandGoogleAnalytics size={20} />,
    label: "Analytics",
    section: "YOUR TOOLS",
  },
  { icon: <IoSettingsOutline size={20} />, label: "Settings" },
];
export const Sidebar: React.FC<SidebarProps> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  const { theme } = useSession();
  console.log("theme123", theme);
  return (
    <>
      <div
        className={`
        fixed inset-y-0 left-0 z-50  overflow-y-auto scrollbar-hide w-64 transform transition-transform duration-300 ease-in-out bg-semi_blue
         dark:bg-semi-dark
        lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

      `}
      >
        <div className="flex items-center justify-between p-4 ">
          <Logo />
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-slate-700"
          >
            <X size={20} className="text-dark dark:text-white" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button className="bg-blue text-white py-2 w-full px-4 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Image src={Icons?.dash_upload_btn_icon} className="h-6 w-6" />
            Upload Project
          </button>
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.section && (
                <div className="text-xs text-gray dark:text-white uppercase tracking-wider mb-2 mt-6">
                  {item.section}
                </div>
              )}
              <a
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray dark:text-white hover:bg-light rounded-tl-3xl rounded-bl-3xl dark:hover:text-blue hover:text-blue`}
              >
                <span className="h-6 w-6 ">{item?.icon} </span>
                <span className="text-sm font-medium ">{item.label}</span>
              </a>
            </div>
          ))}
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};
