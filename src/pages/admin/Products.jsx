import { useOutletContext } from "react-router";
import axios from "axios";

function Products() {
  const { token, API_BASE, API_PATH } = useOutletContext();

  return <>這是產品後台頁</>;
}

export default Products;
