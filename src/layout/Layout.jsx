import { Outlet, NavLink } from "react-router";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between py-4">
          <NavLink to="" className="h3">
            觀葉森活
          </NavLink>
          <div className="d-flex g-2">
            <NavLink to="products" className="px-4 py-2 h6">
              森活選物
            </NavLink>
            <NavLink to="articles" className="px-4 py-2 h6">
              森活日常誌
            </NavLink>

            <NavLink to="about" className="px-4 py-2 h6">
              關於觀葉森活
            </NavLink>
          </div>
          <div className="d-flex">
            <NavLink to="cart" className="me-2 p-2">
              購物車
            </NavLink>
            <NavLink to="personal" className="p-2">
              個人頁面
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
