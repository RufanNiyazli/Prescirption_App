import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../css/LoginForm.css";

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormdata] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginUser(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Giriş uğursuz oldu: " + (error.message || "Naməlum xəta"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Giriş</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Şifrə"
              value={formData.password}
              onChange={(e) =>
                setFormdata({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <button className="submit-button" type="submit">
            Giriş
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
