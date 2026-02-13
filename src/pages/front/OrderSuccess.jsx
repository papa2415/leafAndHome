import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function OrderSuccess() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  const fetchOrderData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/order/${id}`);
      console.log(res.data);
      setOrderData(res.data.order);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);
  return (
    <div className=" container d-flex flex-column justify-content-center">
      <img
        src="https://media.istockphoto.com/id/1125716911/vector/party-popper-with-confetti.jpg?s=612x612&w=0&k=20&c=sAyofM-MQ5TL-pLyFseV9Vke_W2zyYX1btP90oGJQZE="
        alt=""
        style={{ width: "400px", height: "400px" }}
      />
      <h1>付款成功</h1>
      <h4>感謝您的消費</h4>
      <div>
        <h1>訂單編號:{id}</h1>;
      </div>
      <div className="d-flex">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplNWbUtMYE6z3SSfEu_NC_E-X8lnkkBbq0g&s"
          alt=""
        />
        <div className="d-flex flex-column">
          <h4>確認信件已發送至{orderData?.user?.email}</h4>
          <h5></h5>
        </div>
      </div>
      <div className="cartSection border mb-4">
        <div className="head d-flex justify-content-between py-5 px-5 bg-secondary bg-opacity-25 ">
          <h5>訂單內容</h5>
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
            {orderData?.products &&
              Object.entries(orderData.products).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td style={{ width: "400px" }}>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={value.product.imageUrl}
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="d-flex flex-column">
                          <h6>{value.product.titleZh}</h6>
                          <h6>{value.product.titleEn}</h6>
                        </div>
                      </div>
                    </td>
                    <td>${value.product.price}</td>
                    <td>{value.qty}</td>
                    <td>${value.total}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="orderInfo border mb-5 p-5">
        <div className="row">
          <div className="col-6 d-flex flex-column">
            <h3>寄件資訊</h3>
            <h6>{orderData?.user && orderData.user.name}</h6>
            <h6>{orderData?.user && orderData.user.tel}</h6>
            <h6>{orderData?.user && orderData.user.address}</h6>
            <h6>預計抵達日</h6>
            <h6>3-7個工作天</h6>
          </div>
          <div className="col-6 d-flex flex-column">
            <h3>付款資訊</h3>
            <h6>貨到付款</h6>
            <h6>二聯電子發票</h6>
          </div>
        </div>
      </div>
      <div className="orderBreakDown border mb-5 p-5">
        <div className="d-flex flex-column">
          <h3>訂單明細</h3>
          <div className="d-flex justify-content-between">
            <h6>商品總金額</h6>
            <h6>${orderData?.id && orderData.total}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>運費總金額</h6>
            <h6>$120</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>總付款金額</h6>
            <h6>{orderData ? `$${Number(orderData.total) + 120}` : "$0"}</h6>
          </div>
        </div>
      </div>
      <div className="d-flex mb-5">
        <button type="button" className="btn btn-secondary">
          追蹤訂單
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/products")}
        >
          繼續逛逛
        </button>
      </div>
    </div>
  );
}
