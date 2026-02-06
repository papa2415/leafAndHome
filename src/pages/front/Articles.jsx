import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const categories = [
  "全部",
  "新手友善",
  "疑難雜症",
  "澆水技巧",
  "光線需求",
  "居家搭配",
  "蟲蟲危機",
];

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("全部");
  const API_BASE = "https://vue3-course-api.hexschool.io/v2/api";
  const API_PATH = "leafandhome";
  //處理文字斷行邏輯，客製化移除br
  const formatPlainTitle = (text) => {
    if (!text) return "";
    return text.replace(/<br\s*\/?>/gi, " ");
  };
  const articlesData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/${API_PATH}/articles`);
      setArticles(res.data.articles);
    } catch (err) {
      console.error("載入失敗", err);
    } finally {
      //管成功或失敗，最後一定要把 Loading 關掉，否則畫面會永遠卡在載入中
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setArticles([]);
    articlesData();
    window.scrollTo(0, 0); // 捲回頂部
  }, []);

  const filteredArticles = articles.filter((item) => {
    if (selectedTag === "全部") return true;
    // 如果文章的 tag 陣列包含選中的標籤，就回傳 true
    return item.tag?.includes(selectedTag);
  });
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
  return (
    <>
      <div className="container">
        <div className="d-flex">
          {categories.map((tag) => (
            <button
              key={tag}
              className={`btn  px-4 ${selectedTag === tag ? "btn-primary-700" : "btn-outline-primary-700"}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <section className=" bg-neutral-200">
        <div className="container content-wrapper">
          <div className="row gy-3">
            {filteredArticles.map((item) => (
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
                          {item.tag?.map((tag) => (
                            <span
                              key={tag}
                              className="badge  bg-secondary-100 text-secondary-700 px-3 py-2 fw-semibold  "
                            >
                              # {tag}
                            </span>
                          ))}
                        </div>
                        <p className="fw-semibold text-neutral-700 line-clamp-desc mb-2 ">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {/*標籤沒有文章提醒*/}
          {filteredArticles.length === 0 && !isLoading && (
            <div className="text-center py-5">
              <div className="mb-2" style={{ fontSize: "2.5rem" }}>
                🌱
              </div>
              <h4 className="mb-3 fw-blod">這裡的小苗還在努力發芽中...</h4>
              <p className="mb-5">
                目前沒有
                <span className="fw-bold text-primary-700 ">
                  「 {selectedTag}」
                </span>
                相關文章
                <br />
                園丁們正努力翻土播種，準備更多植物知識！請先試試其他標籤吧!
              </p>
              <button
                className="btn btn-primary-700"
                onClick={() => setSelectedTag("全部")}
              >
                回全部文章
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Articles;
