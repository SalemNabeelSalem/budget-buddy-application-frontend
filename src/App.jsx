import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Income from "./pages/Income.jsx";
import Filter from "./pages/Filter.jsx";
import Signup from "./pages/Signup.jsx";
import Expense from "./pages/Expense.jsx";
import Landing from "./pages/Landing.jsx";
import Category from "./pages/Category.jsx";

import { Toaster } from "react-hot-toast"; // used for showing toast notifications.
import { Analytics } from "@vercel/analytics/react"; // used for tracking user interactions and performance metrics.
import { SpeedInsights } from "@vercel/speed-insights/react"; // used for measuring the performance of the application.

const App = () => {
  return (
    <>
      <Toaster />

      {/* Vercel Analytics - tracks user interactions and pageviews */}
      <Analytics />

      {/* Optional: You can render SpeedInsights anywhere */}
      <div style={{ position: "fixed", bottom: 20, right: 20, width: 300 }}>
        <SpeedInsights url="https://budget-buddy-application-frontend.vercel.app" />
      </div>

      <BrowserRouter>
        <Routes>
          {/* Root route checks authentication */}
          <Route path="/" element={<Root />} />

          <Route path="/home" element={<Landing />} />

          <Route path="/dashboard" element={<Home />} />

          <Route path="/category" element={<Category />} />

          <Route path="/income" element={<Income />} />

          <Route path="/expense" element={<Expense />} />

          <Route path="/filter" element={<Filter />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />

          {/* Fallback for any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Root = () => {
  // !! is used to convert the value to a boolean. If the token exists in localStorage, it will return true, otherwise false.
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/home" replace />
  );
}

export default App;