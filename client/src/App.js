import Home from "./components/Home";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Payment from "./components/Payments";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Singup from "./components/Signup";
import Transactions from "./components/Transactions";

import AdminHome from "./components/AdminHome";
import AdminItemForm from "./components/AdminItemForm";
import AdminTransactions from "./components/AdminTransactions";

import ProtectedRoutes from "./components/ProtectedRoutes";

import AppContext from "./context/AppContext";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import "./App.css";

// const dupData = [
//   {
//     id:1,
//     title: "HP K500F Backlit Membrane Wired Lighting, Metal Panel with Logo Lighting",
//     price: 150,
//     rating: 4,
//     itemImage: "https://images-eu.ssl-images-amazon.com/images/I/51u8ZRDCVoL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg"
//   },
//   {
//     id:2,
//     title: "Mens casual shirsts for parties and external things",
//     price: 490,
//     rating: 2,
//     itemImage: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6XNYD6x04wmLc-sSJDKvi_t6ikIg6LargvPDolgye5ADEx5ySOC8MJfslEcomcahgQP3tB86Lqj1mfsc_mXa7nTAGpE2ePhnFqTDpwFnRQpSr3XsayPkp&usqp=CAc"
//   },
//   {
//     id:3,
//     title: "Mesh Casual/Outdoor/Walking/Sports Running Shoes for Mens Boys",
//     price: 120,
//     rating: 3,
//     itemImage: "data:image/webp;base64,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"
//   }
// ]

// element={<ProtectedRoutes component={<ChatBox />} />}

function App() {
  const [cartList, setCartList] = useState([]);
  const [userAddress, setUserAddress] = useState({});

  const addUserAddess = (address) => {
    setUserAddress(address);
  };

  const addCartItem = (product) => {
    const index = cartList.findIndex((each) => each.id === product.id);
    if (index === -1) {
      setCartList([...cartList, product]);
    }
  };

  const removeCartItem = (id) => {
    // removeing product to cart list
    const filteredCartList = cartList.filter((each) => each.id !== id);
    setCartList(filteredCartList);
  };

  const updateCartItem = (product) => {
    // updating cart item in it
    const updateCartList = cartList.map((each) => {
      if (product.id === each.id) {
        return product;
      }
      return each;
    });
    setCartList(updateCartList);
  };

  const clearAllCartItems = () => {
    setCartList([]);
  };

  return (
    <AppContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        updateCartItem,
        clearAllCartItems,
        userAddress,
        addUserAddess,
      }}
    >
      <>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <Home />
                  </>
                }
              />
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <Cart />
                  </>
                }
              />
            }
          />

          <Route
            path="/payments"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <Payment />
                  </>
                }
              />
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <Orders />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <AdminHome />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin-form-create"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <AdminItemForm />
                  </>
                }
              />
            }
          />

          <Route
            path="/admin-transactions"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <AdminTransactions />
                  </>
                }
              />
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoutes
                component={
                  <>
                    <Header />
                    <Transactions />
                  </>
                }
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
        </Routes>
      </>
    </AppContext.Provider>
  );
}

export default App;
