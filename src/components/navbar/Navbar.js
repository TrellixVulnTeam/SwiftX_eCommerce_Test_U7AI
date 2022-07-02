import "./navbar.scss";
import React, { useContext } from "react";
import ContextHook from "../ContextHook";
import CategoriesLinks from "../categoriesLinks/CategoriesLinks";
import { currenciesQuery } from "../../qraphQL/queries";
import { useQuery } from "@apollo/client";
import BagItems from "../bagItems/BagItems";
const Navbar = () => {
  const { data, loading } = useQuery(currenciesQuery);
  const {
    currencyIndex,
    chooseCurrency,
    listIsActive,
    setListIsActive,
    bagIsActive,
    setBagIsActive,
  } = useContext(ContextHook);
  const toggle = () => {
    setListIsActive();
    bagIsActive && setBagIsActive();
  };
  return (
    <div className="navbar-container">
      <div className="first">
        <CategoriesLinks />
      </div>
      <div className="last">
        <div className="currencies">
          <button className="btnToggler" onClick={toggle}>
            {!loading && data.currencies[currencyIndex].symbol}
            <i
              className={`fas fa-angle-down ${listIsActive && "rotating"} `}
            ></i>
          </button>
          <div className={`currencyChangers ${listIsActive && "show"} `}>
            {!loading &&
              data.currencies.map(({ symbol, label }, idx) => (
                <button
                  key={symbol}
                  onClick={() => chooseCurrency(idx, symbol)}
                >
                  {`${symbol}  ${label}`}
                </button>
              ))}
          </div>
        </div>
        <BagItems />
      </div>
    </div>
  );
};
export default Navbar;
