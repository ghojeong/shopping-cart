import React, { FC } from "react";
import { CouponModel } from "models";
import { CouponListItem } from "components";

interface Props {
  coupons: Record<
    CouponModel["id"],
    {
      checked: boolean;
      coupon: CouponModel;
    }
  >;
}
export const CouponList: FC<Props> = ({ coupons }) => (
  <>
    {Object.keys(coupons).map(key => {
      const { checked, coupon } = coupons[key];
      return (
        <CouponListItem key={coupon.id} checked={checked} coupon={coupon} />
      );
    })}
  </>
);
