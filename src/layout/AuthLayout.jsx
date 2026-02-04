import { Outlet } from "react-router";
import { useState } from "react";

function AuthLayout() {
  const [isAuth, setIsAuth] = useState(false);

  return <Outlet context={{ isAuth, setIsAuth }} />;
}
export default AuthLayout;
