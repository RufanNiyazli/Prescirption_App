import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Components/Auth/LoginForm";
import Register from "./Components/Auth/RegisterForm";
import Dashboard from "./Components/Main/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import Receipt from "./Components/Main/Receipt";

function App() {
  return (
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
   
        <Route path="/receipt/:hashId" element={<Receipt />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
