import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductItemModel } from "models";
import { numWithCommas } from "lib/format";

interface Props {
  quantity: number;
  item: ProductItemModel;
  onRemove: (id: string) => void;
  onAddQuantity: (id: string) => void;
  onSubQuantity: (id: string) => void;
}
export const CartListItem: FC<Props> = ({
  quantity,
  item,
  onRemove,
  onAddQuantity,
  onSubQuantity
}) => (
  <div className="card product-card" key={item.id}>
    <div className="card-img-left">
      <img src={item.coverImage} alt={"N/A"} />
    </div>

    <div className="card-body card-right">
      <span className="title">{item.title}</span>
      <p>
        <b>가격: {numWithCommas(item.price)}원</b>
      </p>
      <p>
        <b>수량: {quantity}</b>
      </p>
      <div className="add-remove">
        <button
          type="button"
          className="btn btn-add-cart btn-remove"
          onClick={() => {
            onRemove(item.id);
          }}
        >
          빼기
        </button>
        <Link to="/cart">
          <i
            className="btn add-btn btn-add-cart mr-2"
            onClick={() => {
              onAddQuantity(item.id);
            }}
          >
            +
          </i>
        </Link>
        <Link to="/cart">
          <i
            className="btn add-btn btn-add-cart"
            onClick={() => {
              onSubQuantity(item.id);
            }}
          >
            -
          </i>
        </Link>
      </div>
    </div>
  </div>
);
