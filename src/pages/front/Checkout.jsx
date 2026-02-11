import axios from "axios";
import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartData, setCartData] = useState([]);
  const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);
  const shipping = cartData.length > 0 ? 120 : 0;
  const total = subtotal + shipping;

  const [couponApplied, setCouponApplied] = useState(
    location.state?.couponApplied || false,
  );
  const [couponCode, setCouponCode] = useState(
    location.state?.couponCode || "",
  );
  const [totalAfterCoupon, setTotalAfterCoupon] = useState(
    location.state?.totalAfterCoupon || total,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //onSubmit
  const onSubmit = async (data) => {
    const orderData = {
      data: {
        user: {
          name: data.name,
          email: data.email,
          tel: data.tel,
          address: data.address,
        },
        message: data.remark, // 備註
      },
    };

    try {
      const res = await axios.post(
        `${API_BASE}/v2/api/${API_PATH}/order`,
        orderData,
      );

      console.log("訂單建立成功", res.data);

      navigate("/cart/order-success");
    } catch (error) {
      console.error(error);
      alert("建立訂單失敗");
    }
  };

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
                <h5>訂單內容</h5>
                <button type="button" onClick={() => navigate("/cart")}>
                  回購物車頁
                </button>
              </div>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>商品主圖</th>

                    <th scope="col">單價</th>
                    <th scope="col">數量</th>
                    <th scope="col">總價</th>
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
                        <td>{item.qty}</td>
                        <td>${item.total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="payment border mb-5">
                <div>
                  <h5>付款與發票</h5>
                </div>
                <div className="row">
                  <div className="col-6 d-flex flex-column">
                    <h6>付款:</h6>
                    <label htmlFor="payment">付款方式</label>
                    <select name="" id="payment">
                      <option value="貨到付款">貨到付款</option>
                      <option value="線上刷卡">線上刷卡</option>
                    </select>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <h6>電子發票:</h6>
                    <label htmlFor="einvoice">電子發票類型</label>
                    <select name="" id="einvoice">
                      <option value="二聯電子發票">二聯電子發票</option>
                      <option value="三聯電子發票">三聯電子發票</option>
                    </select>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      placeholder="example@plantlife.com"
                      id="email"
                      {...register("email", {
                        required: "請輸入 Email",
                      })}
                    />
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                    <div className="carrier d-flex gap-4">
                      <div className="type d-flex flex-column">
                        <label htmlFor="carrier">載具類型</label>
                        <select name="" id="carrier">
                          <option value="手機條碼載具">手機條碼載具</option>
                          <option value="會員載具">會員載具</option>
                        </select>
                        <div className="d-flex">
                          <input type="checkbox" id="defaultCarrier" />
                          <label htmlFor="defaultCarrier">設定為預設載具</label>
                        </div>
                      </div>
                      <div className="code d-flex flex-column">
                        <label htmlFor="barcode">載具條碼</label>
                        <input
                          type="text"
                          placeholder="格式:/123-ABC(共8位字元)"
                          id="barcode"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shipping border mb-5">
                <div>
                  <h5>寄送資訊</h5>
                </div>
                <div className="row">
                  <div className="col-6 d-flex flex-column">
                    <h6>收件人資訊:</h6>
                    <label htmlFor="name">全名</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="請輸入您的姓名"
                      {...register("name", { required: "請輸入姓名" })}
                    />
                    {errors.name && (
                      <small className="text-danger">
                        {errors.name.message}
                      </small>
                    )}
                    <label htmlFor="tel">電話號碼</label>
                    <input
                      type="text"
                      id="tel"
                      placeholder="手機或市話"
                      {...register("tel", {
                        required: "請輸入電話",
                        pattern: { value: /^[0-9\-+() ]+$/ },
                        message: "電話格式錯誤",
                      })}
                    />
                    {errors.tel && (
                      <small className="text-danger">
                        {errors.tel.message}
                      </small>
                    )}
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <h6>寄件地址:</h6>
                    <div className="carrier d-flex gap-4">
                      <div className="code d-flex flex-column">
                        <label htmlFor="city">城市</label>
                        <input type="text" value="台北市" id="city" />
                      </div>
                      <div className="type d-flex flex-column">
                        <label htmlFor="section">區</label>
                        <select name="" id="section">
                          <option value="內湖區">內湖區</option>
                          <option value="大安區">大安區</option>
                          <option value="文山區">文山區</option>
                        </select>
                      </div>
                    </div>
                    <label htmlFor="adress">地址</label>
                    <input
                      type="text"
                      placeholder="街道、巷弄、門號、樓層"
                      id="adress"
                    />

                    <label htmlFor="postcode">郵遞區號</label>
                    <input
                      type="text"
                      placeholder="請輸入郵遞區號"
                      id="postcode"
                    />
                    <div className="d-flex">
                      <input type="checkbox" id="defaultInfo" />
                      <label htmlFor="defaultInfo">設定為預設結帳資訊</label>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <h6>備注:</h6>
                      <textarea
                        className="form-control"
                        id="remark"
                        rows="3"
                        placeholder="管理室代收/電聯時間......"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
                  onClick={() => navigate("/cart/order-success")}
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
