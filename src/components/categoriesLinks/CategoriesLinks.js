import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import ContextHook from "../ContextHook";
import { categoriesQuery } from "../../qraphQL/queries";
import "./categoriesLinks.scss";
import { Link } from "react-router-dom";
const CategoriesLinks = () => {
  const { loading, data } = useQuery(categoriesQuery);
  const { categorySelected, setCategorySelected } = useContext(ContextHook);
  return (
    <>
      {!loading &&
        data.categories.map(({ name }) => (
          <Link
            to="/"
            className={` 
            category-link ${name === categorySelected && "selected"} `}
            key={name}
            onClick={() => setCategorySelected(name)}
          >
            {name}
          </Link>
        ))}
    </>
  );
};
export default CategoriesLinks;
