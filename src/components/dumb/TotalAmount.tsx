import React, { FC } from "react";
import { numWithCommas } from "lib/format";

interface Props {
  totalPrice: number;
}
export const TotalAmount: FC<Props> = ({ totalPrice }) => {
  const handleChecked = e => {
    if (e.target.checked) {
      alert("checked");
    } else {
      alert("un-checked");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card p-3 w-100">
          <div className="input-group d-flex align-items-center">
            <input
              id="productCheckbox"
              type="checkbox"
              onChange={handleChecked}
              aria-label="checkbox"
            />
            <span className="flex-fill ml-3">쿠폰 적용</span>
          </div>
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
