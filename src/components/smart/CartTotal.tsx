import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCouponsAsync } from "actions";
import { couponsSelector } from "selectors";
import { CouponCheckBoxListItem, Spinner } from "components";
import { numWithCommas } from "lib/format";

interface Props {
  totalPrice: number;
}
export const CartTotal: FC<Props> = ({ totalPrice }) => {
  const dispatch = useDispatch();
  const { coupons, isLoading } = useSelector(couponsSelector());
  const [calculatedPrice, setCalculatedPrice] = useState(totalPrice);
  const [checkedCoupons, setCheckedCoupons] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    dispatch(fetchCouponsAsync.request());
  }, [dispatch]);

  useEffect(() => {
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
  }, [checkedCoupons, coupons, totalPrice]);

  const handleCouponCheckChangeFactory = (couponKey: string) => e => {
    if (e.target.checked) {
      setCheckedCoupons({ ...checkedCoupons, [couponKey]: true });
    } else {
      setCheckedCoupons({ ...checkedCoupons, [couponKey]: false });
    }
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
          {isLoading ? <Spinner /> : CouponCheckboxList}
          <div className="total-price w-100 mt-3 border-top py-3">
            <b>총 가격: {numWithCommas(calculatedPrice)} 원</b>
          </div>
        </div>
      </div>
      <div className="submit my-3 ">
        <button
          className="btn btn-add-cart"
          disabled={isLoading || calculatedPrice <= 0}
        >
          주문
        </button>
      </div>
    </div>
  );
};
