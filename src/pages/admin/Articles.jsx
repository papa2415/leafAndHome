import { useOutletContext } from "react-router";

function Articles() {
  const { isAuth } = useOutletContext();
  console.log(isAuth);
  return <div></div>;
  // return <>{isAuth ? "這是文章後台頁" : "請先登入"}</>;
}

export default Articles;
