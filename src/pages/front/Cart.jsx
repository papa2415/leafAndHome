import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);
  const shipping = cartData.length > 0 ? 120 : 0;
  const total = subtotal + shipping;
  const [couponCode, setCouponCode] = useState(""); // 使用者輸入
  const [couponApplied, setCouponApplied] = useState(false); // 是否成功套用
  const [totalAfterCoupon, setTotalAfterCoupon] = useState(total); // 折扣後金額
  const navigate = useNavigate();

  //fetchCartData function
  const fetchCartData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(res.data.data.carts);
      console.log(res.data.data.carts);
    } catch (error) {
      alert(error.message);
    }
  };

  //useEffect
  useEffect(() => {
    fetchCartData();
  }, []);

  //updateCart
  const updateCartItemQty = async (itemId, newQty) => {
    const data = {
      product_id: itemId,
      qty: newQty,
    };
    try {
      await axios.put(`${API_BASE}/api/${API_PATH}/cart/${itemId}`, {
        data,
      });
      fetchCartData();
    } catch (err) {
      console.error(err);
      alert("更新失敗");
    }
  };

  //deletecart
  const deleteCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${itemId}`,
      );
      fetchCartData();
    } catch (error) {
      console.error(error);
      alert("刪除失敗");
    }
  };

  //deletecarts
  const deleteCarts = async () => {
    try {
      const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      fetchCartData();
    } catch (error) {
      console.error(error);
      alert("刪除失敗");
    }
  };

  //applyCoupon
  const applyCoupon = async () => {
    const data = {
      code: couponCode,
    };
    try {
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/coupon`, {
        data,
      });
      if (res.data.success) {
        setCouponApplied(true);
        setTotalAfterCoupon(res.data.data.final_total);
        alert(res.data.message);
      } else {
        alert("優惠卷無效或已過期");
        setCouponApplied(false);
        setTotalAfterCoupon(total);
      }
    } catch (error) {
      alert("優惠卷套用失敗...");
      setCouponApplied(false);
      setTotalAfterCoupon(total);
    }
  };

  return (
    <>
      <div className="container mb-5 ">
        <div className="row d-flex justify-content-between">
          <div className="col-9 ">
            <div className="cartSection border mb-4">
              <div className="head d-flex justify-content-between py-5 px-5 bg-secondary bg-opacity-25">
                <h5>購物車</h5>
                <button type="button" onClick={() => deleteCarts()}>
                  全部刪除
                </button>
              </div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>商品主圖</th>

                    <th scope="col">單價</th>
                    <th scope="col">數量</th>
                    <th scope="col">總價</th>
                    <th scope="col">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.product.imageUrl}
                            style={{
                              height: "100px",
                              width: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>${item.product.price}</td>
                        <td>
                          <div className="input-group w-auto">
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              id="btn-decrease"
                              onClick={() => {
                                if (item.qty > 1) {
                                  updateCartItemQty(item.id, item.qty - 1);
                                }
                              }}
                            >
                              －
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              value={item.qty}
                              min="1"
                              id="qtyInput"
                              onChange={(e) => {
                                let val = parseInt(e.target.value);
                                if (isNaN(val) || val < 1) val = 1;
                                updateCartItemQty(item.id, val);
                              }}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              id="btn-increase"
                              onClick={() =>
                                updateCartItemQty(item.id, item.qty + 1)
                              }
                            >
                              ＋
                            </button>
                          </div>
                        </td>
                        <td>${item.total}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteCart(item.id)}
                          >
                            刪除
                          </button>
                          <button type="button">加入收藏</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="addOnSection border mb-5">
              <div className="head d-flex justifify-contetn-start align-items-end bg-secondary-500">
                <h5>加購服務</h5>
                <span className="fs-7">常一起選購的加購服務</span>
              </div>
              <ul>
                <li className="d-flex justify-content-around align-items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoTqFvPu3IOd_DzmzYwpB_GmNYcbcd02WsQ&s"
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <h5>到貨換盆</h5>
                    <h6>專業換盆服務，含優質培養土</h6>
                  </div>
                  <input
                    type="number"
                    defaultValue={1}
                    style={{ width: "60px", height: "36px" }}
                  />
                  <h4>NT$150</h4>
                  <button type="button" style={{ height: "36px" }}>
                    加入
                  </button>
                </li>
                <li className="d-flex justify-content-around align-items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoTqFvPu3IOd_DzmzYwpB_GmNYcbcd02WsQ&s"
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <h5>送禮包裝</h5>
                    <h6>精美禮盒包裝，附手寫卡片</h6>
                  </div>
                  <input
                    type="number"
                    defaultValue={1}
                    style={{ width: "60px", height: "36px" }}
                  />
                  <h4>NT$150</h4>
                  <button type="button" style={{ height: "36px" }}>
                    加入
                  </button>
                </li>
                <li className="d-flex justify-content-around align-items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoTqFvPu3IOd_DzmzYwpB_GmNYcbcd02WsQ&s"
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <h5>新手照護卡</h5>
                    <h6>專屬照護指南，隨貨附贈</h6>
                  </div>
                  <input
                    type="number"
                    defaultValue={1}
                    style={{ width: "60px", height: "36px" }}
                  />
                  <h4>NT$150</h4>
                  <button type="button" style={{ height: "36px" }}>
                    加入
                  </button>
                </li>
              </ul>
            </div>
            <div className="watchList border">
              <div className="head d-flex justify-content-between align-items-cneter bg-secondary-500">
                <div className="d-flex justify-content-start ">
                  <h5>收藏清單</h5>
                  <span className="fs-7">那些您曾停下來看過的植物</span>
                </div>
                <button type="button">查看全部</button>
              </div>
              <ul>
                <li className="d-flex justify-content-around align-items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoTqFvPu3IOd_DzmzYwpB_GmNYcbcd02WsQ&s"
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <h5>吊蘭</h5>
                    <h6>Spider Plant</h6>
                  </div>
                  <input
                    type="number"
                    defaultValue={1}
                    style={{ width: "60px", height: "36px" }}
                  />
                  <h4>NT$340</h4>
                  <button type="button" style={{ height: "36px" }}>
                    加入
                  </button>
                </li>

                <li className="d-flex justify-content-around align-items-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoTqFvPu3IOd_DzmzYwpB_GmNYcbcd02WsQ&s"
                    alt=""
                  />
                  <div className="d-flex flex-column">
                    <h5>波士頓蕨</h5>
                    <h6>Boston Fern</h6>
                  </div>
                  <input
                    type="number"
                    defaultValue={1}
                    style={{ width: "60px", height: "36px" }}
                  />
                  <h4>NT$350</h4>
                  <button type="button" style={{ height: "36px" }}>
                    加入
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">
            <div
              className="card border px-5 py-5 position-sticky"
              style={{ top: "16px" }}
            >
              <div className="card-head">
                <h3 className="card-title text-center">訂單內容</h3>
              </div>
              <div className="card-body">
                <div className="d-flex  flex-column  align-items-start w-auto">
                  <h5>優惠卷</h5>
                  <div className="input-group w-auto">
                    <input
                      type="text"
                      placeholder="輸入優惠碼"
                      className={`form-control ${couponApplied ? "border-success bg-light text-success" : ""}`}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied} // 成功套用後禁用
                    />
                    <button
                      type="button btn-secondary"
                      className={`btn btn-${couponApplied ? "success" : "secondary"}`}
                      onClick={applyCoupon}
                      disabled={couponApplied}
                    >
                      {couponApplied ? "已套用" : "套用"}
                    </button>
                  </div>
                  {couponApplied && (
                    <small className="text-success mt-1">
                      折扣碼{couponCode}已套用
                    </small>
                  )}
                </div>
                <div className="orderBreakDown">
                  <div className="productPrice d-flex justify-content-between">
                    <h5>商品總金額</h5>
                    <h5>${subtotal}</h5>
                  </div>
                  <div className="shipping d-flex justify-content-between">
                    <h5>運費總金額</h5>
                    <h5>${shipping}</h5>
                  </div>
                  <div className="orderPrice d-flex justify-content-between">
                    <h5>總付款金額</h5>
                    <h5>{couponApplied ? totalAfterCoupon : total}</h5>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate("checkout", {
                      state: { couponApplied, couponCode, totalAfterCoupon },
                    })
                  }
                >
                  繼續結帳
                </button>
              </div>
              <p className="card-text">安心結帳</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
