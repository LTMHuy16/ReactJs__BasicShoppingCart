import 'react-toastify/dist/ReactToastify.css';
import "./css/app.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Notfound from "./components/Notfound";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        limit={2}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
