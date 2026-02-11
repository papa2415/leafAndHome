import { Outlet, NavLink, useOutletContext } from "react-router";
import mark from "/mark.svg";
import Footer from "./Footer.jsx";

function CartLayout() {
  // const { isAuth, setIsAuth } = useOutletContext();{//暫時沒用到//}
  return (
    <div className="d-flex flex-column min-vh-100 bg-neutral-100">
      <header className="bg-white" style={{ marginBottom: "80px" }}>
        <div className="container ">
          <div className="d-flex justify-content-start align-items-end py-4">
            <div className="d-flex justify-content-start gap-4">
              <NavLink to="/" className="h3 d-flex align-items-center">
                <img src={mark} alt="logo" className="me-2" />
                <span className="text-underline">觀葉森活</span>
              </NavLink>
              <span className="text-secondary-100" style={{ fontSize: "28px" }}>
                |
              </span>
              <span className="text-neutral-700" style={{ fontSize: "28px" }}>
                購物車
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="flex-fill">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default CartLayout;
