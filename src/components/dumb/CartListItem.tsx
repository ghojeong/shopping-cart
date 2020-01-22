import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductItemModel } from "models";
import { numWithCommas } from "lib/format";
import { ROUTE_CART } from "routes";

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
      <p>
        <button
          type="button"
          onClick={() => {
            onRemove(item.id);
          }}
        >
          <div>&times;</div>
        </button>
      </p>
      <div className="title">{item.title}</div>
      <div>
        <b>가격: {numWithCommas(item.price)}원</b>
      </div>
      <p>
        <b>수량: {quantity}</b>
      </p>
      <div className="add-remove">
        <Link to={ROUTE_CART}>
          <p
            className="btn add-btn btn-add-cart mr-2"
            onClick={() => {
              onAddQuantity(item.id);
            }}
          >
            +
          </p>
        </Link>
        <Link to={ROUTE_CART}>
          <p
            className="btn add-btn btn-add-cart"
            onClick={() => {
              onSubQuantity(item.id);
            }}
          >
            -
          </p>
        </Link>
      </div>
    </div>
  </div>
);
