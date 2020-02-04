import React from "react";
import { useSelector } from "react-redux";
import { couponsSelector, cartSelector } from "selectors";
import { CouponList, Spinner, SubmitButton, TotalPrice } from "components";

export const CartTotal = () => {
  const { isLoading } = useSelector(couponsSelector());
  const { cartCoupons, totalPrice } = useSelector(cartSelector());

  return (
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
  );
};
