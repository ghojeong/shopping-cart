import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCouponsAsync } from "actions";
import { couponsSelector, cartSelector } from "selectors";
import { CouponCheckBoxListItem, Spinner } from "components";
import { numWithCommas } from "lib/format";

export const CartTotal = () => {
  const dispatch = useDispatch();
  const { coupons, isLoading } = useSelector(couponsSelector());
  const { cartItems } = useSelector(cartSelector());
  const [totalPrice, setTotalPrice] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [checkedCoupons, setCheckedCoupons] = useState<Record<string, boolean>>(
    {}
  );
  const [
    hasCouponUnavailableItemsOnly,
    setHasCouponUnavailableItemsOnly
  ] = useState(Object.keys(cartItems).length < 1);

  useEffect(() => {
    let price = 0;
    let hasCouponUnavailableItem = Object.keys(cartItems).length < 1;
    for (const key in cartItems) {
      const { quantity, product: item } = cartItems[key];
      price += quantity * item.price;
      hasCouponUnavailableItem =
        hasCouponUnavailableItem && item.availableCoupon === false;
    }
    setTotalPrice(price);
    setHasCouponUnavailableItemsOnly(hasCouponUnavailableItem);
  }, [cartItems]);

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
          {!hasCouponUnavailableItemsOnly &&
            (isLoading ? <Spinner /> : CouponCheckboxList)}
          <div className="total-price w-100 mt-3 py-3">
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
