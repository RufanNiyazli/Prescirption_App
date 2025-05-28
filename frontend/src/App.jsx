import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Components/Auth/LoginForm";
import Register from "./Components/Auth/RegisterForm";
import Dashboard from "./Components/Main/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
