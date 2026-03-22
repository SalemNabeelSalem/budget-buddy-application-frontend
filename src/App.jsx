import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Income from "./pages/Income.jsx";
import Filter from "./pages/Filter.jsx";
import Signup from "./pages/Signup.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";

import {Toaster} from "react-hot-toast"; // used for showing toast notifications.

const App = () => {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />

          <Route path="/dashboard" element={<Home />} />

          <Route path="/category" element={<Category />} />

          <Route path="/income" element={<Income />} />

          <Route path="/expense" element={<Expense />} />

          <Route path="/filter" element={<Filter />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Root = () => {
  // !! is used to convert the value to a boolean. If the token exists in localStorage, it will return true, otherwise false.
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"></Navigate>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}

export default App;