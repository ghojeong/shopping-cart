import React, { FC } from "react";
import { numWithCommas } from "lib/format";

interface Props {
  totalPrice: number;
}
export const TotalPrice: FC<Props> = ({ totalPrice }) => (
  <div className="total-price w-100 mt-3 border-top py-3">
    <b>총 가격: {numWithCommas(totalPrice)} 원</b>
  </div>
);
