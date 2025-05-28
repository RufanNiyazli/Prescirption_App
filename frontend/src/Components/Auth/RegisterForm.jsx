import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    try {
      await registerUser(formData);
      navigate("/dashboard");
    } catch (error) {
      setError("Register uğursuz oldu: " + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="Username"
          value={formData.username}
        />

        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="Email"
        />

        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
        />

        <button type="submit">Register</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterForm;
