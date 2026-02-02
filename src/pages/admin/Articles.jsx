import { useOutletContext } from "react-router";
import axios from "axios";

function Articles() {
  const { token, API_BASE, API_PATH } = useOutletContext();

  return <div>文章後台頁</div>;
}

export default Articles;
