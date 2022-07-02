import "./productDetails.scss";
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { productQuery } from "../../qraphQL/queries";
import ContextHook from "../../components/ContextHook";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(productQuery, { variables: { id: id } });
  const [imgIndex, setImgIndex] = useState(0);
  const { currencyIndex, cartItems, addToCart, removeFromCart } =
    useContext(ContextHook);
  const productInCart =
    !loading &&
    cartItems.find(({ id }) => (id === data.product.id ? true : false));
  return (
    <div className="productDetailsPage">
      <div className="imagesChanger">
        {!loading &&
          data.product.gallery.map((src, idx) => (
            <img
              key={src}
              src={src}
              className={`${imgIndex === idx && "showing"}`}
              alt={src}
              onClick={() => setImgIndex(idx)}
            />
          ))}
      </div>
      <div className="image-wall">
        <img
          src={`${!loading && data.product.gallery[imgIndex]}`}
          alt="background wall"
        />
      </div>
      <div className="aboutProduct">
        <h3 className="productCategory">{!loading && data.product.category}</h3>
        <h2 className="productName">{!loading && data.product.name}</h2>
        <div className="price">
          <h4>price:</h4>
          <p>
            <span>
              {!loading && data.product.prices[currencyIndex].currency.symbol}
            </span>
            {!loading && data.product.prices[currencyIndex].amount}
          </p>
        </div>
        <button
          onClick={() =>
            !productInCart
              ? addToCart(data, imgIndex)
              : removeFromCart(data.product)
          }
        >
          {!productInCart ? "add to cart" : "removing"}
        </button>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: !loading && data.product.description,
          }}
        />
      </div>
    </div>
  );
};
export default ProductDetailsPage;
