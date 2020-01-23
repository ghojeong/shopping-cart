import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ProductItemModel } from "models";
import { numWithCommas } from "lib/format";
import { ROUTE_CART } from "routes";
import { checkItem, uncheckItem } from "actions";

interface Props {
  checked: boolean;
  quantity: number;
  item: ProductItemModel;
  onRemove: (id: string) => void;
  onAddQuantity: (id: string) => void;
  onSubQuantity: (id: string) => void;
}
export const CartListItem: FC<Props> = ({
  checked,
  quantity,
  item,
  onRemove,
  onAddQuantity,
  onSubQuantity
}) => {
  const dispatch = useDispatch();
  return (
    <div className="card product-card align-items-center" key={item.id}>
      <input
        className="checkbox"
        type="checkbox"
        onClick={() => {
          const { id } = item;
          if (checked) {
            dispatch(uncheckItem({ id }));
          } else {
            dispatch(checkItem({ id }));
          }
        }}
        aria-label="checkbox"
        checked={checked}
      />
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
        <div>{item.title}</div>
        {item.availableCoupon === false && (
          <div className="text-danger">쿠폰 사용이 불가능한 상품입니다.</div>
        )}
        <div>가격: {numWithCommas(item.price)}원</div>
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
};
