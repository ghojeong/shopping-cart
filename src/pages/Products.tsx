import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItemsAsync, addItemToCart } from "actions";
import { productItemsWithOrderSelector } from "selectors";
import { ProductListItem } from "components";

export const Products = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(productItemsWithOrderSelector());

  useEffect(() => {
    dispatch(fetchProductItemsAsync.request());
  }, [dispatch]);

  const handleAddCart = (id: string) => {
    dispatch(addItemToCart({ id }));
  };

  const ProductList = Object.keys(items).map(key => {
    const item = items[key];
    return (
      <ProductListItem key={item.id} item={item} onAddCart={handleAddCart} />
    );
  });

  return (
    <div className="container py-4 mt-5">
      <h3 className="text-left">상품</h3>
      <div className="d-flex flex-wrap">{ProductList}</div>
    </div>
  );
};
