import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function getCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexTokenAPI="))
    ?.split("=")[1];
}

function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(() => getCookie() ?? "");
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      //如果 取不到token 不打 API 驗證
      if (!token) {
        setIsAuth(false);
        return;
      }
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${API_BASE}/api/user/check`);
        console.log(response.data);
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        navigate("/admin", { replace: true });
      }
    };
    checkLogin();
  }, [token, location.pathname, navigate]);

  //驗證失敗 跳回首頁
  useEffect(() => {
    const isAdminIndex = pathname === "/admin" || pathname === "/admin/";
    if (isAuth === false && !isAdminIndex) {
      navigate("/admin", { replace: true });
    }
  }, [isAuth, pathname, navigate]);

  return (
    <>
      <NavLink to="" setToken={setToken}>
        首頁
      </NavLink>
      <NavLink to="update">上傳圖片</NavLink>
      <NavLink to="order">訂單頁</NavLink>
      <NavLink to="coupon">酷碰頁</NavLink>
      <NavLink to="articles">文章頁</NavLink>
      <NavLink to="products">產品頁面</NavLink>
      <Outlet />
    </>
  );
}
export default AdminLayout;
