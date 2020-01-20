import React, { FC, ChangeEvent } from "react";
import { CouponModel } from "models";

interface Props {
  coupon: CouponModel;
  onCheckChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const CouponCheckBoxListItem: FC<Props> = ({
  coupon,
  onCheckChange
}) => (
  <div className="input-group d-flex align-items-center">
    <input type="checkbox" onChange={onCheckChange} aria-label="checkbox" />
    <span className="flex-fill ml-3">{coupon.title}</span>
  </div>
);
