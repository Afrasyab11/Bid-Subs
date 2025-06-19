import Image from "./image/Image";
import { useEffect, useState } from "react";
import { Icons } from "@/assets/Index";
import { useSession } from "@/sessionManager/SessionContext";
const Logo = () => {
  const { theme } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [theme]);

  if (!mounted) return null;

  return (
    <Image
      src={theme === "dark" ? Icons?.darkAuthLogo : Icons?.whiteLogo}
      alt="Logo"
      className="h-auto w-auto"
    />
  );
};

export default Logo;
