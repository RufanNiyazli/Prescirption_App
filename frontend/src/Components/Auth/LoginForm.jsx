import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email} 
          onChange={(e) =>
            setFormdata({ ...formData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Şifrə"
          value={formData.password}
          onChange={(e) =>
            setFormdata({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Giriş</button>
      </form>
      
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default LoginForm;