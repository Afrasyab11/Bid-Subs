import Image from "@/common/image/Image";
import { Icons } from "@/assets/Index";
import { useSession } from "@/sessionManager/SessionContext";
export const Header = () => {
  const { theme } = useSession();
  return (
    <div className="fixed text-white w-screen text-center py-4 backdrop-blur-sm z-20">
      <div className="w-full flex justify-center">
        <Image
          src={theme === "light" ? Icons?.lightLogo : Icons?.darkAuthLogo}
          className="h-auto w-auto"
          alt="Dark logo"
        />
      </div>
    </div>
  );
};
