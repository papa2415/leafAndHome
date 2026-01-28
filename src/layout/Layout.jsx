import { Outlet, NavLink } from "react-router";
import Footer from "./Footer";
import mark from "/mark.svg";

function Layout() {
  return (
    <>
      <header>
        <div className="container">
          <div className="d-flex justify-content-between py-4">
            <NavLink to="" className="h3 d-flex align-items-center">
              <img src={mark} alt="logo" className="me-2" />
              <span className="text-underline">觀葉森活</span>
            </NavLink>
            <div className="d-flex g-2">
              <NavLink to="products" className="px-4 py-2 h6">
                <span className="text-underline">森活選物</span>
              </NavLink>
              <NavLink to="articles" className="px-4 py-2 h6">
                <span className="text-underline">森活日常誌</span>
              </NavLink>
              <NavLink to="about" className="px-4 py-2 h6">
                <span className="text-underline">關於觀葉森活</span>
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
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
