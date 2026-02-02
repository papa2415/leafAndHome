import { useOutletContext } from "react-router";
import axios from "axios";

function Order() {
  const { token, API_BASE, API_PATH } = useOutletContext();

  return <>這是訂單頁</>;
}

export default Order;
