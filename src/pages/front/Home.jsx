import { NavLink } from "react-router";

import place_image from "/place.png";
import phone from "/phone.png";

import Card_place from "../../component/Card_place";
import product from "/product.png";
import Card_product from "../../component/Card_product";
import article from "/article.png";
import Card_article from "../../component/Card_Article";
import Pill from "../../component/Pill";
import Card_list from "../../component/Card_list";

function Home() {
  return (
    <>
      <section className="py-11 py-md-14 bg-neutral-100">
        <div className=" container">
          <div className="text-center mb-6 mb-md-13">
            <h2 className="h2 mb-md-6 mb-4">從你的生活場景開始</h2>
            <p className="h6 text-neutral-700">不知道該選什麼植物？告訴我們你想綠化的空間， </p>
            <p className="h6 text-neutral-700">我們為你推薦最適合的植栽方案。</p>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-6">
            <div className="col">
              <Card_place image={place_image} title="租屋小套房" content="小空間也能綠意盎然" />
            </div>
            <div className="col">
              <Card_place image={place_image} title="辦公桌增綠" content="工作環境更舒心" />
            </div>
            <div className="col">
              <Card_place image={place_image} title="臥室療癒角" content="助眠淨化好夥伴" />
            </div>
            <div className="col">
              <Card_place image={place_image} title="陽台小花園" content="戶外綠化好選擇" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-11 py-md-14 bg-neutral-200">
        <div className="container">
          <div className="text-center mb-6 mb-md-13">
            <h2 className="h2 mb-md-6 mb-4">最適合新手的植物清單</h2>
            <p className="h6  text-neutral-700">我們根據新手最常見的需求，先幫你整理幾組『不容易失敗』的推薦清單</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              <Card_list title="幾乎沒日照也能活" subTitle="適合幾乎沒日照空間的植物 TOP 5" />
            </div>
            <div className="col">
              <Card_list title="常常忘記澆水也沒關係" subTitle="最不怕你忘記澆水的植物 Top 5" />
            </div>
            <div className="col">
              <Card_list title="桌上只放得下一點點綠" subTitle="小桌面也放得下的迷你植栽 Top 5" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-neutral-100">
        <div className="container">
          <h2 className="h4 text-center text-secondary-500 mb-12">想單純滑滑看最近的新朋友和人氣款？從這裡開始逛就好。</h2>
          <div>
            <h4 className="h4">新品上架</h4>
            <p className="mb-6">本週最新到貨，搶先擁有最美的綠意</p>
            <div className="row row-cols-1 row-cols-md-4 g-6 mb-12">
              <div className="cols">
                <Card_product product={product} />
              </div>
              <div className="cols">
                <Card_product product={product} />
              </div>
              <div className="cols">
                <Card_product product={product} />
              </div>
              <div className="cols">
                <Card_product product={product} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="h4">本月熱銷排行</h4>
            <p className="mb-6">這些是本月最常被帶回家的植物，不太需要猶豫的選擇。</p>
            <div className="row  row-cols-1 row-cols-md-4 g-6 mb-12">
              <div className="cols">
                <Card_product product={product} />
              </div>
              <div className="cols">
                <Card_product product={product} />
              </div>
              <div className="cols">
                <Card_product product={product} />
              </div>
              <div className="cols">
                <Card_product product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-neutral-200">
        <div className="container">
          <h2 className="h2 text-center mb-12">森活誌精選</h2>
          <div className="d-flex gap-9">
            <div className="articlr-left">
              <Card_article article={article} size="" />
            </div>
            <div className="article-right d-none d-md-block">
              <div className="mb-9">
                <Card_article article={article} size="s" />
              </div>
              <Card_article article={article} size="s" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-neutral-100">
        <div className="container">
          <div className="px-14 py-3">
            <div className="d-flex  flex-wrap  flex-lg-nowrap justify-content-center row-gap-8 column-gap-14">
              <img src="https://storage.googleapis.com/vue-course-api.appspot.com/leafandhome/1770040902658.png" className="phone" alt="儀表板" />
              <div className="d-flex flex-column pt-3 pb-5">
                <div>
                  <h2 className="h2 mb-3">別忘了你的森活儀表板</h2>
                  <h4 className="h4 text-neutral-700">澆水、施肥、換盆日通通幫你記好，</h4>
                  <h4 className="h4 text-neutral-700 mb-5 mb-md-8">不用再靠記憶就能穩穩養好每一盆植物。</h4>
                  <div className="d-flex flex-wrap row-gap-2 column-gap-4 text-secondary-700">
                    <Pill title="澆水提醒" />
                    <Pill title="澆水提醒" />
                    <Pill title="澆水提醒" />
                    <Pill title="澆水提醒" />
                  </div>
                </div>
                <div className="mt-8 mt-lg-auto d-flex flex-wrap align-items-center">
                  <button type="button" className="btn btn-primary-700 me-lg-5">
                    前往我的森活儀表板
                  </button>
                  <NavLink to="/Personal" className="h6 fw-bold">
                    <span className="text-underline">看看我有哪些植物</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
