import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductView from "../components/Products/ProductView";
import { getProductDetail } from "../redux_part/ActionCreaters/productActions";

const ProductDetail = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [dispatch, productId]);

  return (
    <div>
      product detail for {productId}
      <ProductView />
    </div>
  );
};

export default ProductDetail;
