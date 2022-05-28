import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./UserPost/CreatePost";
import Home from "./UserPost/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
