// import { Routing } from "./routes/Routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./components/landingPage/LandingComp";
import Dashboard from "./components/dashboard/Dashboard";
import { DashboardLayout } from "./layout/DashboardLayout";
import { ROUTES_ENUM } from "./constants/routes.constant";
import { AuthLayout } from "./layout/AuthLayout";
import { ResetPassword } from "./components/auth/components/ResetPassword";
import { OTP } from "./components/auth/components/Otp";
import { CreatePassword } from "./components/auth/components/CreatePassword";
import { PasswordChange } from "./components/auth/components/PasswordChange";
import { LoginAndSignUp } from "./components/auth/components/LoginAndSignUpLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path={ROUTES_ENUM.ROOT} element={<Home />} />
          <Route path={ROUTES_ENUM.LOGIN} element={<AuthLayout />}>
            <Route index element={<Auth />} />
          </Route> */}
          <Route path={ROUTES_ENUM.ROOT} element={<Landing />} />
          <Route element={<AuthLayout />}>
            <Route path={ROUTES_ENUM.LOGIN} element={<LoginAndSignUp />} />
            <Route
              index
              path={ROUTES_ENUM.PASS_CHANGE}
              element={<PasswordChange />}
            />
            <Route
              path={ROUTES_ENUM.CRE_PASSWORD}
              element={<CreatePassword />}
            />
            <Route path={ROUTES_ENUM.OPT} element={<OTP />} />
            <Route
              path={ROUTES_ENUM.RES_PASSWORD}
              element={<ResetPassword />}
            />
          </Route>
          <Route path={"/"} element={<DashboardLayout />}>
            <Route path={ROUTES_ENUM.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
