import { useEffect, useState } from "react";
import { Icons } from "@/assets/Index";
import { useSession } from "@/sessionManager/SessionContext";
const Logo = () => {
  const { theme } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [theme]);

  if (!mounted) return null;

  return (
    <>
      <img
        src={Icons.whiteLogo}
        alt="Logo"
        className="block dark:hidden h-auto w-auto"
      />

      <img
        src={Icons.darkAuthLogo}
        alt="Logo"
        className="hidden dark:block h-auto w-auto"
      />
    </>
  );
};

export default Logo;
