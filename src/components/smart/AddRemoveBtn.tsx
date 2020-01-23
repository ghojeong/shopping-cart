import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductItemModel } from "models";
import { addItemToCart, removeItemFromCart } from "actions";
import { cartSelector } from "selectors";

interface Props {
  id: ProductItemModel["id"];
}
export const AddRemoveButton: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(cartSelector());
  const item = cartItems[id];

  if (item && item.quantity > 0) {
    return (
      <button
        type="button"
        className="btn btn-remove"
        onClick={() => {
          dispatch(removeItemFromCart({ id }));
        }}
      >
        빼기
      </button>
    );
  }
  return (
    <button
      type="button"
      className="btn btn-add-cart"
      onClick={() => {
        dispatch(addItemToCart({ id }));
      }}
    >
      담기
    </button>
  );
};
