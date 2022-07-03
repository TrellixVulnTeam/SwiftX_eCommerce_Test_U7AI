import React, { useContext } from "react";
import ContextHook from "../ContextHook";

const Item = ({ item }) => {
  const {
    currencyIndex,
    incrementQty,
    decrementQty,
    moveBack,
    moveForward,
    removeFromCart,
  } = useContext(ContextHook);
  return (
    <>
      <div className="details">
        <h4>{item.name}</h4>
        <h4>
          {item.prices[currencyIndex].currency.symbol}
          {item.prices[currencyIndex].amount * item.quantity}
        </h4>
        <button className="remvoveItem" onClick={() => removeFromCart(item)}>
          remove
        </button>
      </div>
      <div className="quantity">
        <button
          className={`${item.quantity === 10 && "disActive"}`}
          onClick={() => incrementQty(item)}
        >
          +
        </button>
        <span>{item.quantity}</span>
        <button
          className={`${item.quantity === 1 && "disActive"}`}
          onClick={() => decrementQty(item)}
        >
          -
        </button>
      </div>
      <div className="imageContainer">
        <img src={`${item.gallery[item.imgIndex]}`} alt={item.name} />
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
            className={`${item.imgIndex === item.gallery.length - 1 && "disActive"}`}
            onClick={() => moveForward(item)}
          >
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Item;
