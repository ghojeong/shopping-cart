import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { CouponModel } from "models";
import { checkCoupon, uncheckCoupon } from "actions";

interface Props {
  checked: boolean;
  coupon: CouponModel;
}
export const CouponListItem: FC<Props> = ({ checked, coupon }) => {
  const dispatch = useDispatch();

  return (
    <div className="input-group d-flex align-items-center">
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => {
          const { id } = coupon;
          if (checked) {
            dispatch(uncheckCoupon({ id }));
          } else {
            dispatch(checkCoupon({ id }));
          }
        }}
        aria-label="checkbox"
        checked={checked}
      />
      <span className="flex-fill ml-3">{coupon.title}</span>
    </div>
  );
};
