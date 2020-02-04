import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItemsAsync } from "actions";
import { productItemsWithOrderSelector } from "selectors";
import { ProductList, Spinner } from "components";

export const Products = () => {
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector(productItemsWithOrderSelector());

  useEffect(() => {
    dispatch(fetchProductItemsAsync.request());
  }, [dispatch]);

  return (
    <div className="container py-4 mt-5">
      <h3 className="text-left">상품</h3>
      <div className="d-flex flex-wrap">
        {isLoading ? <Spinner /> : <ProductList items={items} />}
      </div>
    </div>
  );
};
