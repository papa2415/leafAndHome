import place from "/place.png";
import plant from "/plant.png";
import phone from "/phone.png";
import Card_hor from "../../component/Card_hor";
import Card_place from "../../component/Card_place";
import product from "/product.png";
import Card_product from "../../component/Card_product";
import article from "/article.png";
import Card_article from "../../component/Card_Article";
import Pill from "../../component/Pill";

function Home() {
  return (
    <div>
      <section className="py-14 bg-neutral-100">
        <div className=" container">
          <div className="text-center mb-13">
            <h2 className="h2 mb-6">從你的生活場景開始</h2>
            <p className="h6 text-neutral-700">不知道該選什麼植物？告訴我們你想綠化的空間， </p>
            <p className="h6 text-neutral-700">我們為你推薦最適合的植栽方案。</p>
          </div>
          <div className="row row-cols-4 g-6">
            <div className="col">
              <Card_place place={place} />
            </div>
            <div className="col">
              <Card_place place={place} />
            </div>
            <div className="col">
              <Card_place place={place} />
            </div>
            <div className="col">
              <Card_place place={place} />
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-neutral-200">
        <div className="container">
          <div className="text-center  mb-13">
            <h2 className="h2 mb-6">最適合新手的植物清單</h2>
            <p className="h6  text-neutral-700">我們根據新手最常見的需求，先幫你整理幾組『不容易失敗』的推薦清單</p>
          </div>
          <div className="row row-cols-3">
            <div className="col">
              <div className="card radius-top-right p-5">
                <h3 className="text-neutral-900">幾乎沒日照也能活</h3>
                <p className="text-neutral-700 mb-5">適合幾乎沒日照空間的植物 TOP 5</p>
                <div className="card-body">
                  <div className="row  flex-column g-4">
                    <div className="cols">
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card radius-top-right p-5">
                <h3 className="text-neutral-900">幾乎沒日照也能活</h3>
                <p className="text-neutral-700 mb-5">適合幾乎沒日照空間的植物 TOP 5</p>
                <div className="card-body">
                  <div className="row  flex-column g-4">
                    <div className="cols">
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card radius-top-right p-5">
                <h3 className="text-neutral-900">幾乎沒日照也能活</h3>
                <p className="text-neutral-700 mb-5">適合幾乎沒日照空間的植物 TOP 5</p>
                <div className="card-body">
                  <div className="row  flex-column g-4">
                    <div className="cols">
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                      <Card_hor plant={plant} />
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="row row-cols-4 g-6 mb-12">
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
            <div className="row row-cols-4 g-6 mb-12">
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
          <div className="row">
            <div className="col-8">
              <Card_article article={article} size="" />
            </div>
            <div className="col-4">
              <Card_article article={article} size="s" />
              <Card_article article={article} size="s" />
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-neutral-100">
        <div className="container">
          <div className="px-14 py-3">
            <div className="d-flex justify-content-center gap-14">
              <img src={phone} className="phone" alt="儀表板" />
              <div className="pt-3 pb-5">
                <h2 className="h2  mb-3">別忘了你的森活儀表板</h2>
                <h4 className="h4 text-neutral-700">澆水、施肥、換盆日通通幫你記好，</h4>
                <h4 className="h4 text-neutral-700 mb-8">不用再靠記憶就能穩穩養好每一盆植物。</h4>
                <div className="d-flex gap-4 text-secondary-700">
                  <Pill />
                  <Pill />
                  <Pill />
                  <Pill />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
