import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductsListPage from "./pages/PLP/ProductsListPage";
import ProductDetailsPage from "./pages/PDP/ProductDetailsPage";
import CartPage from "./pages/CART/CartPage";
import ContextHook from "./components/ContextHook";
import Navbar from "./components/navbar/Navbar";
import { useToggle } from "./components/customHooks";
import ScrollToTop from "./ScrollToTop";
const App = () => {
  const [categorySelected, setCategorySelected] = useState("all");
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [totalSymbol, setTotalSymbol] = useState("$");
  const [listIsActive, setListIsActive] = useToggle(false);
  const [bagIsActive, setBagIsActive] = useToggle(false);
  const chooseCurrency = (index, symbol) => {
    setListIsActive();
    setCurrencyIndex(index);
    setTotalSymbol(symbol);
  };
  const addToCart = (query, indexSelected) => {
    setCartItems((cart) => [
      ...cart,
      {
        ...query.product,
        quantity: 1,
        imgIndex: indexSelected,
      },
    ]);
  };
  const incrementQty = (product) => {
    setCartItems((cart) =>
      cart.map((item) =>
        item.id === product.id && product.quantity < 10
          ? { ...product, quantity: product.quantity + 1 }
          : item
      )
    );
  };
  const decrementQty = (product) => {
    setCartItems((cart) =>
      cart.map((item) =>
        item.id === product.id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : item
      )
    );
  };
  const removeFromCart = (product) => {
    setCartItems((cart) => cart.filter(({ id }) => id !== product.id));
  };
  const moveForward = (product) => {
    product.imgIndex !== product.gallery.length - 1 &&
      setCartItems((cart) =>
        cart.map((item) =>
          item.id === product.id
            ? { ...product, imgIndex: product.imgIndex + 1 }
            : item
        )
      );
  };
  const moveBack = (product) => {
    product.imgIndex !== 0 &&
      setCartItems((cart) =>
        cart.map((item) =>
          item.id === product.id
            ? { ...product, imgIndex: product.imgIndex - 1 }
            : item
        )
      );
  };
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.prices[currencyIndex].amount,
    0
  );
  const checkOut = () => {
    if (totalPrice > 0) {
      alert("Purchased successfully");
      window.location.href = "/";
    }
  };
  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.code === "Escape") {
        listIsActive && setListIsActive();
        bagIsActive && setBagIsActive();
      }
    };
  });
  return (
    <BrowserRouter>
      <ContextHook.Provider
        value={{
          categorySelected,
          setCategorySelected,
          products,
          setProducts,
          productDetails,
          setProductDetails,
          currencyIndex,
          setCurrencyIndex,
          totalSymbol,
          setTotalSymbol,
          cartItems,
          setCartItems,
          addToCart,
          removeFromCart,
          incrementQty,
          decrementQty,
          checkOut,
          moveForward,
          moveBack,
          chooseCurrency,
          totalPrice,
          listIsActive,
          setListIsActive,
          bagIsActive,
          setBagIsActive,
        }}
      >
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<ProductsListPage />} />
            <Route path="/:id/details" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <ScrollToTop />
        </div>
      </ContextHook.Provider>
    </BrowserRouter>
  );
};
export default App;
