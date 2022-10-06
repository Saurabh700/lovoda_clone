import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllRoutes from "./allRoutes/AllRoutes";
import "./App.css";
import Footer1 from "./assets/footer/Footer1";
import Footer2 from "./assets/footer/Footer2";
import Header from "./assets/header/Header";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/") {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div className="App">
      <Header />
      <AllRoutes />
      <Footer1 />
      <Footer2 />
    </div>
  );
}

export default App;
