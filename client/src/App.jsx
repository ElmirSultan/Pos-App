import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Bills from "./pages/Bills";
import Customers from "./pages/Customers";
import Statistics from "./pages/Statistics";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart))
  }, [cart])
  
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element=
            {<RouteControl>
              <HomePage />
            </RouteControl>} />
            <Route path="/cart" element={
              <RouteControl>
                <CartPage />
              </RouteControl>
            } />
            <Route path="/bills" element={
              <RouteControl>
                <Bills />
              </RouteControl>
            } />
            <Route path="/customers" element={
              <RouteControl>
                <Customers />
              </RouteControl>
            } />
            <Route path="/statistics" element={
              <RouteControl>
                <Statistics />
              </RouteControl>
            } />
            <Route path="/products" element={
              <RouteControl>
                <ProductPage />
              </RouteControl>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

export const RouteControl = ({children}) => {
  if(localStorage.getItem("posUser")){
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
