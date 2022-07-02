import React, { useContext } from "react";
import ContextHook from "../../components/ContextHook";
import "./productsLists.scss";
import { useQuery } from "@apollo/client";
import { categoriesQuery } from "../../qraphQL/queries";
import Category from "../../components/category/Category";
const ProductsListPage = () => {
  const { categorySelected } = useContext(ContextHook);
  const { loading, data } = useQuery(categoriesQuery);
  return (
    <div className="productsListsPage">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        data.categories
          .filter(({ name }) => name === categorySelected)
          .map((category) => (
            <div className="category" key={category.name}>
              <Category category={category} />
            </div>
          ))
      )}
    </div>
  );
};
export default ProductsListPage;
