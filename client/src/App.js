import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllRoutes from "./allRoutes/AllRoutes";
import "./App.css";
import Footer1 from "./assets/footer/Footer1";
import Footer2 from "./assets/footer/Footer2";
import Header from "./assets/header/Header";
import { getUsersData } from "./redux/authReducer/action";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.AuthReducer);

  useEffect(() => {
    if (token) {
      // console.log("i am sending data");
      dispatch(getUsersData(token));
    }
  }, []);

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
