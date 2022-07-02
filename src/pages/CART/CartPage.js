import React, { useContext } from "react";
import ContextHook from "../../components/ContextHook";
import ItemOfCart from "../../components/item/ItemOfCart";
import "./cart.scss";
const CartPage = () => {
  const { cartItems, totalSymbol, checkOut, totalPrice } =
    useContext(ContextHook);
  return (
    <div className="cartPage">
      <h2 className="cartHeading">
        Cart
        {cartItems.length > 0 && (
          <span>
            {cartItems.length === 1 ? " 1 item" : ` ${cartItems.length} items`}{" "}
          </span>
        )}
      </h2>
      {cartItems.length === 0 ? (
        <h3 className="noItemsHeading">No Items</h3>
      ) : (
        <div className="items">
          {cartItems.map((item) => (
            <div className="item" key={item.id}>
              <ItemOfCart item={item} />
            </div>
          ))}
        </div>
      )}
      <div className="totalPrice">
        <p>
          Total
          <span>
            {totalSymbol}
            {totalPrice}
          </span>
        </p>
      </div>
      <button
        className={` checkOutButton ${totalPrice === 0 && "disActive"}`}
        onClick={checkOut}
      >
        Check Out
      </button>
    </div>
  );
};
export default CartPage;
