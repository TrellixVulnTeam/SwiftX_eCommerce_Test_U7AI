import React, { useContext } from "react";
import ContextHook from "../ContextHook";

const ItemOfCart = ({ item }) => {
  const {
    currencyIndex,
    incrementQty,
    decrementQty,
    moveForward,
    moveBack,
    removeFromCart,
  } = useContext(ContextHook);
  return (
    <>
      <div>
        <h3 className="itemCategory">{item.category}</h3>
        <h3 className="itemName">{item.name}</h3>
        <h3 className="itemPrice">
          {item.prices[currencyIndex].currency.symbol}
          {item.prices[currencyIndex].amount * item.quantity}
        </h3>
      </div>
      <div>
        <div className="quantity">
          <button
            className={`${item.quantity === 10 && "disActive"}`}
            onClick={() => incrementQty(item)}
          >
            +
          </button>
          <span>{item.quantity}</span>
          <button
            disabled={item.quantity === 1}
            className={`${item.quantity === 1 && "disActive"}`}
            onClick={() => decrementQty(item)}
          >
            -
          </button>
        </div>
        <div className="imageContainer">
          <img src={item.gallery[item.imgIndex]} alt="itemImage" />
          <div className="arrowsButtons">
            <button
              disabled={item.imgIndex === 0}
              className={`${item.imgIndex === 0 && "disActive"}`}
              onClick={() => moveBack(item)}
            >
              <i className="fas fa-angle-left"></i>
            </button>
            <button
              disabled={item.imgIndex === item.gallery.length - 1}
              className={`${
                item.imgIndex === item.gallery.length - 1 && "disActive"
              }`}
              onClick={() => moveForward(item)}
            >
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
      <button className="removeButton" onClick={() => removeFromCart(item)}>
        <i class="fas fa-trash-alt"></i>
      </button>
    </>
  );
};

export default ItemOfCart;
