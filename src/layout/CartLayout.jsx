import { Outlet, NavLink } from "react-router";

function CartLayout() {
  return (
    <>
      <NavLink to="/">觀葉森活</NavLink>
      <Outlet />
    </>
  );
}
export default CartLayout;
