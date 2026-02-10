import { Outlet, NavLink, useOutletContext } from "react-router";
import mark from "/mark.svg";
import Footer from "./Footer.jsx";

function CartLayout() {
  // const { isAuth, setIsAuth } = useOutletContext();{//暫時沒用到//}
  return (
    <>
      <header>
        <div className="container ">
          <div className="d-flex justify-content-start align-items-end py-4">
            <NavLink to="/" className="h3 d-flex align-items-center">
              <img src={mark} alt="logo" className="me-2" />
              <span className="text-underline">觀葉森活</span>
            </NavLink>
            <div className="d-flex justify-content-start">
              <span className="fs-5">|</span>
              <span className="fs-5">購物車</span>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
export default CartLayout;
