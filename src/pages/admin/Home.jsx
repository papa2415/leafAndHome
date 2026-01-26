import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  //登入
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      document.cookie = `hexTokenAPI=${token};expires=${new Date(expired)};`;

      navigate("products", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container p-4">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              帳號
            </label>
            <input type="email" name="username" className="form-control" id="userName" aria-describedby="userName" placeholder="email" value={formData.username} onChange={(e) => handleInputChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              密碼
            </label>
            <input type="password" name="password" className="form-control" id="password" placeholder="password" value={formData.password} onChange={(e) => handleInputChange(e)} />
          </div>
          <button type="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
