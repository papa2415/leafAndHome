import { Outlet, NavLink } from "react-router";

function Layout() {
  return (
    <>
      <div className="container">
        {" "}
        <NavLink to="">首頁</NavLink>
        <NavLink to="about">關於我</NavLink>
        <NavLink to="cart">購物車</NavLink>
        <NavLink to="products">產品頁</NavLink>
        <NavLink to="articles">文章頁</NavLink>
        <NavLink to="personal">個人頁面</NavLink>
      </div>

      <Outlet />
    </>
  );
}
export default Layout;
