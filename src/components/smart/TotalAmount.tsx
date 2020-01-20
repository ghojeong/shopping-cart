import React, { FC, useEffect, useState } from "react";
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
  const checkedCoupons: Record<string, boolean> = {};
  const [calculatedPrice, setCalculatedPrice] = useState(totalPrice);

  useEffect(() => {
    dispatch(fetchCouponsAsync.request());
  }, [dispatch]);

  const calcTotalPrice = () => {
    let price = totalPrice;
    for (const key in coupons) {
      if (checkedCoupons[String(key)]) {
        const { discountRate, discountAmount } = coupons[key];
        if (discountRate && discountRate > 0 && discountRate < 100) {
          price -= price * discountRate * 0.01;
        }
        if (discountAmount && discountAmount > 0) {
          price -= discountAmount;
        }
        if (price < 0) {
          setCalculatedPrice(0);
          return;
        }
      }
    }
    setCalculatedPrice(price);
  };

  const handleCouponCheckChangeFactory = (couponKey: string) => e => {
    if (e.target.checked) {
      checkedCoupons[couponKey] = true;
    } else {
      checkedCoupons[couponKey] = false;
    }
    calcTotalPrice();
  };

  const CouponCheckboxList = Object.keys(coupons).map(key => {
    const coupon = coupons[key];
    return (
      <CouponCheckBoxListItem
        key={coupon.title}
        coupon={coupon}
        onCheckChange={handleCouponCheckChangeFactory(key)}
      />
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="card p-3 w-100">
          {CouponCheckboxList}
          <div className="Total-price w-100 mt-3 border-top py-3">
            <b>총 가격: {numWithCommas(calculatedPrice)} 원</b>
          </div>
        </div>
      </div>
      <div className="checkout my-3 ">
        <button className="btn btn-add-cart">주문</button>
      </div>
    </div>
  );
};
