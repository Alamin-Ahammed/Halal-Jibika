import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import './App.css'

function App() {
  
  return (
    <>
      <div className="navabar_bg">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
