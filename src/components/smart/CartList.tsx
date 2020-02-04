import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart, addQuantity, subQuantity } from "actions";
import { ProductItemModel } from "models";
import { CartListItem } from "components";

interface Item {
  product: ProductItemModel;
  checked: boolean;
  quantity: number;
}
interface Props {
  items: Record<ProductItemModel["id"], Item>;
}
export const CartList: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeItemFromCart({ id }));
  };
  const handleAddQuantity = (id: string) => {
    dispatch(addQuantity({ id }));
  };
  const handleSubQuantity = (id: string) => {
    dispatch(subQuantity({ id }));
  };

  return (
    <>
      {Object.keys(items).map(key => {
        const { checked, quantity, product } = items[key];
        return (
          quantity > 0 && (
            <CartListItem
              key={product.id}
              checked={checked}
              quantity={quantity}
              item={product}
              onRemove={handleRemove}
              onAddQuantity={handleAddQuantity}
              onSubQuantity={handleSubQuantity}
            />
          )
        );
      })}
    </>
  );
};
