import Logo from "@/common/Logo";
export const Header = () => {
  return (
    <div className="fixed text-white w-screen text-center py-4 backdrop-blur-sm z-20">
      <div className="w-full flex justify-center">
        <Logo />
      </div>
    </div>
  );
};
