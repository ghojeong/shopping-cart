import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCouponsAsync, checkAllItems, uncheckAllCoupons } from "actions";
import { couponsSelector, cartSelector } from "selectors";
import {
  CartList,
  CouponList,
  Spinner,
  SubmitButton,
  TotalPrice
} from "components";

export const Cart = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(couponsSelector());
  const { cartItemsNum, cartItems, cartCoupons, totalPrice } = useSelector(
    cartSelector()
  );

  useEffect(() => {
    dispatch(fetchCouponsAsync.request());
    dispatch(checkAllItems());
    dispatch(uncheckAllCoupons());
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
      <div className="container">
        <div className="row">
          <div className="card p-3 w-100">
            {isLoading ? <Spinner /> : <CouponList coupons={cartCoupons} />}
            <TotalPrice totalPrice={totalPrice} />
          </div>
        </div>
        <div className="submit my-3 ">
          <SubmitButton disabled={isLoading || totalPrice <= 0}>
            주문
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};
