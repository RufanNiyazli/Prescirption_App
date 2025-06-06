import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../css/RegisterForm.css";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser(formData);
      navigate("/dashboard");
    } catch (error) {
      setError("Qeydiyyat uğursuz oldu: " + error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Qeydiyyat</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="İstifadəçi adı"
              value={formData.username}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Şifrə"
              required
            />
          </div>

          <button className="submit-button" type="submit">
            Qeydiyyatdan keç
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="login-link">
          Artıq hesabınız var? <a href="/login">Giriş edin</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
