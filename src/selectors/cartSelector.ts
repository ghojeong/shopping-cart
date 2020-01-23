import { ProductItemModel } from "models";
import { RootState } from "reducers";

interface CartItem {
  product: ProductItemModel;
  checked: boolean;
  quantity: number;
}
type CartItems = Record<ProductItemModel["id"], CartItem>;
interface Cart {
  cartItems: CartItems;
  cartItemsNum: number;
}
export const cartSelector = () => ({
  productItems: { items },
  cart: { cartItemsState, cartItemsNum }
}: RootState): Cart => {
  const cartItems: CartItems = {};
  for (let id in cartItemsState) {
    cartItems[id] = {
      product: items[id],
      checked: cartItemsState[id].checked,
      quantity: cartItemsState[id].quantity
    };
  }
  return {
    cartItems,
    cartItemsNum
  };
};
