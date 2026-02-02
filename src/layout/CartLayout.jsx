import { Outlet, NavLink } from "react-router";
import mark from "/mark.svg";

function CartLayout() {
  return (
    <>
      <header>
        <div className="container">
          <div className="d-flex justify-content-between py-4">
            <NavLink to="/" className="h3 d-flex align-items-center">
              <img src={mark} alt="logo" className="me-2" />
              <span className="text-underline">觀葉森活</span>
            </NavLink>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
export default CartLayout;
