import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductItemsAsync, checkAllItems } from "actions";
import { cartSelector } from "selectors";
import { CartTotal, CartList } from "components";

export const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, cartItemsNum } = useSelector(cartSelector());

  useEffect(() => {
    dispatch(fetchProductItemsAsync.request());
    dispatch(checkAllItems());
  }, [dispatch]);

  return (
    <div className="container py-4 mt-5">
      <div className="cart-warpper">
        <h3 className="text-left">장바구니</h3>
        {cartItemsNum > 0 ? (
          <CartList items={cartItems} />
        ) : (
          <p>장바구니에 담긴 상품이 없습니다.</p>
        )}
      </div>
      <CartTotal />
    </div>
  );
};
