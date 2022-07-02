import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ContextHook from "../ContextHook";
const Categpry = ({ category }) => {
  const { currencyIndex } = useContext(ContextHook);
  return (
    <>
      <h3 className="categoryHeading">
        {category.name === "all" ? category.name : category.name}
      </h3>
      <div className="products">
        {category.products.map((product) => (
          <div className="product" key={product.name}>
            <div className="image-wall">
              <img src={product.gallery[0]} alt={product.name} />
              <Link to={`/${product.id}/details`}>
                <i className="fal fa-shopping-cart"></i>
              </Link>
            </div>
            <div className="details">
              <h5>{product.name}</h5>
              <h4>
                {product.prices[currencyIndex].currency.symbol}
                {product.prices[currencyIndex].amount}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Categpry;