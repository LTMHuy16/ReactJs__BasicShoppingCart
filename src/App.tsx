import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Info from "./pages/Info";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<AddEdit />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
