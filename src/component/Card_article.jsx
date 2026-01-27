import { NavLink } from "react-router";
function Card_article({ article, size }) {
  if (size === "s") {
    return (
      <>
        <NavLink className="w-100 card-article-link" to="/articles">
          <div className="card-article radius-top-right">
            <img src={article} className="mb-3 radius-top-right" alt="租屋小套房" />
            <div className="pb-5">
              <h5 className="h5 mb-2 ">成為金手指小秘訣：如何判斷植物該澆水</h5>
              <p className="text-neutral-700">深入解析「乾透澆透」的實作方法，幫助新手掌握最適水份節奏，告別爛根煩惱。</p>
            </div>
          </div>
        </NavLink>
      </>
    );
  }
  return (
    <>
      <NavLink className="w-100 card-article-link" to="/articles">
        <div className="card-article radius-top-right">
          <img src={article} className="radius-top-right mb-5" alt="租屋小套房" />
          <div className="pb-5">
            <h4 className="h4 mb-2">5 種新手最友善「零失敗」室內觀葉植物！</h4>
            <h6 className="h6 mb-6 text-neutral-700">告別植物殺手稱號！嚴選出5種容錯率最高、最耐操、最適合新手的品種。</h6>
            <button type="button" className="btn btn-primary-500 text-white">
              立即閱讀
            </button>
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default Card_article;
