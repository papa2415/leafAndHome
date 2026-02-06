import React,{ useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Articles() {
  const [articles,setArticles]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
    const API_BASE = "https://vue3-course-api.hexschool.io/v2/api";
  const API_PATH = "leafandhome";
    const articlesData = async () => {
    setIsLoading(true);
    try {
      const res=await axios.get(`${API_BASE}/${API_PATH}/articles`)
      setArticles(res.data.articles);
    } catch (err) {
      console.error("載入失敗", err);
    } finally {
      //管成功或失敗，最後一定要把 Loading 關掉，否則畫面會永遠卡在載入中
      setIsLoading(false);
    }
  };
  useEffect(() => {
      setArticles(null);
      articlesData();
      window.scrollTo(0, 0); // 捲回頂部
    }, []);
    //先處理「載入中」的狀態
  if (!articles) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-success mb-3"></div>
          <p className="text-muted">🌿正在為您搬運植物...</p>
        </div>
      </div>
    );
  }
    //處理文字斷行邏輯，客製化移除br
  const formatPlainTitle = (text) => {
    if (!text) return "";
    return text.replace(/<br\s*\/?>/gi, " ");
  };
  return (
    <section className=" bg-neutral-200">
      <div className="container content-wrapper">
         {}
      <div className="row gy-3">
    {articles.map((item)=>(
 <div key={item.id} className="col-md-4 mb-3 d-flex">
                  <Link
                    to={`/articles/${item.id}`}
                    className="d-block w-100 text-decoration-none d-flex flex-column"
                  >
                    <div className="card d-flex flex-column  h-100 border-0 radius-top-right  hover-up-small overflow-hidden p-3">
                      <img
                        src={item.image}
                        className="card-img-top card-img radius-top-right "
                        alt={formatPlainTitle(item.title)}
                      />

                      <div className="card-content mt-4 d-flex flex-column flex-grow-1">
                        <div>
                          <h5 className="fw-bold mb-2 text-truncate">
                            {formatPlainTitle(item.title)}
                          </h5>
                        </div>
                        <div className="mt-auto">
                         
                          <div className="d-flex align-items-center gap-1 flex-wrap mb-3">
                         {item.tag?.map((tag)=>(
                            <span
                    key={tag}
                    className="badge  bg-secondary-100 text-secondary-700 px-3 py-2 fw-semibold  "
                  >
                    # {tag}
                  </span>
                         ))}</div>
                          <p className="fw-semibold text-neutral-700 line-clamp-desc mb-2 ">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
  ))}</div></div>
  </section>);
}

export default Articles;
