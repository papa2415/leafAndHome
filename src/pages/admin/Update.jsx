import { useOutletContext } from "react-router";
import axios from "axios";

function Update() {
  const { token, API_BASE, API_PATH } = useOutletContext();

  return <>這是圖片上傳頁</>;
}

export default Update;
