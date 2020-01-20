import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductItemsAsync,
  removeItemFromCart,
  addQuantity,
  subQuantity
} from "actions";
import { cartSelector } from "selectors";
import { TotalAmount, CartListItem } from "components";

export const Cart = () => {
  const dispatch = useDispatch();
  const { itemsWithQuantity, cartItemsNum } = useSelector(cartSelector());

  useEffect(() => {
    dispatch(fetchProductItemsAsync.request());
  }, [dispatch]);

  const handleRemove = (id: string) => {
    dispatch(removeItemFromCart({ id }));
  };
  const handleAddQuantity = (id: string) => {
    dispatch(addQuantity({ id }));
  };
  const handleSubQuantity = (id: string) => {
    dispatch(subQuantity({ id }));
  };

  let totalPrice = 0;

  const CartList =
    cartItemsNum > 0 ? (
      Object.keys(itemsWithQuantity).map(key => {
        const { quantity, product: item } = itemsWithQuantity[key];
        totalPrice += quantity * item.price;
        return (
          quantity > 0 && (
            <CartListItem
              key={item.id}
              quantity={quantity}
              item={item}
              onRemove={handleRemove}
              onAddQuantity={handleAddQuantity}
              onSubQuantity={handleSubQuantity}
            />
          )
        );
      })
    ) : (
      <p>장바구니에 담긴 상품이 없습니다.</p>
    );

  return (
    <div className="container py-4 mt-5">
      <div className="cart-warpper">
        <h3 className="text-left">장바구니</h3>
        {CartList}
      </div>
      <TotalAmount totalPrice={totalPrice} />
    </div>
  );
};
