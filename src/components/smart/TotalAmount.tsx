import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCouponsAsync } from "actions";
import { couponsSelector } from "selectors";
import { CouponCheckBoxListItem } from "components";
import { numWithCommas } from "lib/format";

interface Props {
  totalPrice: number;
}
export const TotalAmount: FC<Props> = ({ totalPrice }) => {
  const dispatch = useDispatch();
  const { coupons } = useSelector(couponsSelector());

  useEffect(() => {
    dispatch(fetchCouponsAsync.request());
  }, [dispatch]);

  const handleChecked = e => {
    if (e.target.checked) {
      alert("checked");
    } else {
      alert("un-checked");
    }
  };

  const CouponCheckboxList = Object.keys(coupons).map(key => {
    const coupon = coupons[key];
    return (
      <CouponCheckBoxListItem
        key={coupon.title}
        coupon={coupon}
        onCheckChange={handleChecked}
      />
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="card p-3 w-100">
          {CouponCheckboxList}
          <div className="Total-price w-100 mt-3 border-top py-3">
            <b>총 가격: {numWithCommas(totalPrice)} 원</b>
          </div>
        </div>
      </div>
      <div className="checkout my-3 ">
        <button className="btn btn-add-cart">주문</button>
      </div>
    </div>
  );
};
