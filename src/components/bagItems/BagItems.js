import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./bagItems.scss";
import ContextHook from "../ContextHook";
import ItemOfBag from "../item/ItemOfBag";
const BagItems = () => {
  const {
    cartItems,
    totalSymbol,
    checkOut,
    bagIsActive,
    setBagIsActive,
    listIsActive,
    setListIsActive,
    totalPrice,
  } = useContext(ContextHook);

  const toggle = () => {
    setBagIsActive();
    listIsActive && setListIsActive();
  };
  return (
    <div className="bagItems">
      <button className="bagToggler" onClick={toggle}>
        <i className="fal fa-shopping-cart"></i>
        {cartItems.length > 0 && (
          <span className="length">{cartItems.length}</span>
        )}
      </button>
      <div className={`listItems ${bagIsActive && "active"}`}>
        <h4 className="bagHeading">
          my bag
          {cartItems.length > 0 && (
            <span>
              {cartItems.length === 1
                ? " 1 item"
                : ` ${cartItems.length} items`}
            </span>
          )}
        </h4>
        {cartItems.length === 0 ? (
          <h3 className="noItemsHeading">No Items</h3>
        ) : (
          <div className="items">
            {cartItems.map((item) => (
              <div className="item" key={item.id}>
                <ItemOfBag item={item} />
              </div>
            ))}
          </div>
        )}
        <div className="totalPrice">
          <span>Total</span>
          <span>
            {totalSymbol}
            {totalPrice}
          </span>
        </div>
        <div className="linkAndButton">
          <Link to="/cart" onClick={setBagIsActive}>
            view bag
          </Link>
          <button
            className={`${cartItems.length === 0 && "disActive"}`}
            onClick={checkOut}
          >
            check out
          </button>
        </div>
      </div>
    </div>
  );
};
export default BagItems;
