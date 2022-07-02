import { gql } from "@apollo/client";
export const categoriesQuery = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        description
        category
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
        }
      }
    }
  }
`;
export const productQuery = gql`
  query getProductId($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;
export const currenciesQuery = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;