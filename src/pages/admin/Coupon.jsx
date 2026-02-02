import { useOutletContext } from "react-router";
import axios from "axios";

function Coupon() {
  const { token, API_BASE, API_PATH } = useOutletContext();
  return <>這是優惠券管理頁</>;
}

export default Coupon;
