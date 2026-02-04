import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Article() {
  // 💡 如果你是用路由 (Route)，這裡會用 useParams 取得網址上的 id
  // 假設路由是 /article/:articleId
  //const { articleId } = useParams();
// 1. 把網址抓到的 ID 暫時存到 urlId 裡
const { articleId: urlId } = useParams();
  const articleId = urlId || "-OjFbN8au2K1LWeWt0Vp";
  // --- **狀態管理 (State)** ---
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  // --- 身分與登入狀態 ---
  const [currentUser,setCurrentUser]=useState({userName:"綠手指小明"})
  // --- 留言輸入內容 ---
  const[comment,setComment]=useState("");
 
  const API_BASE = "https://vue3-course-api.hexschool.io/v2/api";
  const API_PATH = "leafandhome";
  useEffect(() => {
    articlesData();
  }, [articleId]);
  const articlesData = async () => {
    setIsLoading(true);
    try {
      const [resDetail, resList] = await Promise.all([
        axios.get(`${API_BASE}/${API_PATH}/article/${articleId}`),
        axios.get(`${API_BASE}/${API_PATH}/articles`)
      ]);

      setArticle(resDetail.data.article);
      setArticles(resList.data.articles);
    } catch (err) {
      console.error("載入失敗", err);
    } finally {
      //管成功或失敗，最後一定要把 Loading 關掉，否則畫面會永遠卡在載入中
      setIsLoading(false);
    }
  };

  // --- **資料處理邏輯** ---
  //推薦文章判斷
  const relatedArticles = useMemo(() => {
    if (!article || !articles.length) return []; // 如果資料還沒回來，先回傳空陣列
    return (
      articles
        //排除現在看的文章
        .filter((item) => item.id !== article.id)
        //從 item.tag 裡面找出跟 article.tag 一樣的東西，並且把它重新組成一個陣列
        .map((item) => {
          const sametag =
            item.tag?.filter((tag) => article.tag?.includes(tag)) || [];
          return {
            ...item,
            //在item物件的物件裡面新增一個相同tag數量總計
            score: sametag.length
          };
        })

        // 分數高優先，同分隨機
        .sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score;
          }
          //分數一樣時，隨機排列
          return 0.5 - Math.random();
        })
        //取前三
        .slice(0, 3)
    );
  }, [article, articles]);

  //處理文字斷行邏輯，客製化移除br
  const formatPlainTitle = (text) => {
    if (!text) return "";
    return text.replace(/<br\s*\/?>/gi, " ");
  };
// --- 留言送出邏輯 ---
  // 3. 留言送出：React 是單向資料流，送出留言後，你要如何「不重新抓取 API」就讓畫面上出現新留言？


  // ---**事件處理 (Event Handlers)** ---
  //先處理「載入中」的狀態
  if (!article) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-success mb-3"></div>
          <p className="text-muted">🌿正在為您搬運植物...</p>
        </div>
      </div>
    );
  }
  
//分享功能
  const handleShare = (type) => {
    //當前瀏覽器完整網址
    const url = window.location.href;
    if (type === "fb") {
      //用來開啟新視窗或新分頁的方法，encodeURIComponent()是網址編碼
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    } else if (type === "line") {
      window.open(
        `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
          url
        )}`,
        "_blank"
      );
    } else if (type === "copy") {
      //網頁有權限存取系統的複製.貼上功能，將網址變成字串寫入使用者的電腦剪貼簿中
      navigator.clipboard.writeText(url);
      alert("文章連結已複製！");
    }
  };

  //留言邏輯
  
  
  return (
    <div className="article-page">
      {/* hero區塊 */}
      <header className="hero-section">
        <div className="container text-center">
          <h1
            className="display-4 fw-bold "
            dangerouslySetInnerHTML={{ __html: article?.title }}
          ></h1>
          <p>
            作者:{article?.author} | 發布日期：
            {new Date(article?.create_at * 1000).toLocaleDateString()}
          </p>
        </div>
      </header>

      {/*前言區 */}
      <div className="container py-10">
        <p className="lead text-dark opacity-75 mb-5 pb-4 border-bottom text-center lh-lg italic">
          「 {article?.description} 」
        </p>

        {/*文章內容區*/}
        {article.contentBlocks?.map((block, index) => {
          switch (block.type) {
            case "heading":
              return (
                <h3
                  key={index}
                  className="fw-bold  mb-6 px-9 article-content text-gray-900"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                ></h3>
              );
            case "paragraph":
             {/*dangerouslySetInnerHTML可以把HTML標籤的字串轉為網頁標籤*/}
              return (
                <p
                  key={index}
                  className="article-content px-9 text-gray-700 fw-medium"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              );
            case "image":
              return (
                <figure key={index} className="img-fluid  my-12 text-center">
                  <img
                    src={block.imageUrl}
                    alt={block.caption}
                    className="img-fluid  rounded-custom"
                  />
                  {block.caption && (
                    <figcaption className="text-muted  mt-4 italic text-center">
                     ——  {block.caption}
                    </figcaption>
                  )}
                </figure>
               
              );  }
        })}
</div>
  { /* 分享與標籤區 */}
<div className="container">
{article.contentBlocks?.map((block, index) => {
          switch (block.type) {
            case "relatedProducts":
              return (
                <div key={index}>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-4 my-5 border-top border-bottom bg-light px-4 rounded-3">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="text-muted small fw-bold me-1">
                        標籤：
                      </span>
                      {article.tag?.map((tag) => (
                        <span
                          key={tag}
                          className="badge rounded-pill bg-success px-3 py-2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                      <button
                        className="btn rounded-circle share-btn"
                        onClick={() => handleShare("fb")}
                      >
                        <i class="bi bi-facebook"></i>
                      </button>
                      <button
                        className="btn rounded-circle share-btn"
                        onClick={() => handleShare("line")}
                      >
                        <i class="bi bi-line"></i>
                      </button>
                      <button
                        className="btn rounded-circle share-btn"
                        onClick={() => handleShare("copy")}
                      >
                        <i class="bi bi-link-45deg"></i>
                      </button>
                    </div>
                  </div>
                  {/* 相關商品區 */}
                  <h4 className="fw-bold mb-4 text-success border-start border-4 border-success ps-3">
                    {block.title}
                  </h4>
                  <div className="row mb-5">
                    {block.products?.map((product) => {
                      return (
                        <div key={product.productId} className="col-6 col-md-4">
                          <div className="card h-100 border-0 shadow-sm hover-up-small overflow-hidden">
                            <img
                              src={product.img}
                              className="card-img-top card-img rounded-0"
                              alt={product.name}
                            />
                            <div className="card-body">
                              <p className="card-text small">{product.name}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
          }
        })}

        {/* 推薦文章區 */}
        <div class="row">
          <h4 className="fw-bold mb-4 text-success border-start border-4 border-success ps-3">
            更多成為綠手指的小祕訣
          </h4>
          {relatedArticles.map((article) => (
            <div key={article.id} className="col-md-4 mb-3">
              <div className="card card h-100 border-0 shadow-sm hover-up-small overflow-hidden">
                <img
                  src={article.image}
                  className="card-img-top card-img rounded-0"
                  alt={formatPlainTitle(article.title)}
                />
                <div className="card-body">
                  <h6 className="card-text">
                    {formatPlainTitle(article.title)}
                  </h6>
                  <p
                    className="card-text small text-muted mb-0"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "2", // 限制顯示行數，多的變 ...
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: "1.5",
                      minHeight: "3em" // 保持高度一致，避免卡片長短不一
                    }}
                  >
                    {article.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 7. 留言列表: 找出 contentBlocks 中 type 為 commentSection 的區塊 */}
    
        {/* 8. 留言輸入表單: input (暱稱) 與 textarea (內容) */}
      </div>
    </div>
  );
};

export default Article;
