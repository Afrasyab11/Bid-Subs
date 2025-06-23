import { useEffect, useState } from "react";
import { useSession } from "@/sessionManager/SessionContext";
import { CheckCircle } from "lucide-react";
const Logo = () => {
  const { theme } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), [theme]);

  if (!mounted) return null;

  return (
   <div className="flex items-center gap-2">
   <CheckCircle className="size-8 dark:text-white text-neutral-900" />
   <span className="text-3xl font-bold dark:text-white text-neutral-900">BidSubs</span>
    </div>
  );
};

export default Logo;
