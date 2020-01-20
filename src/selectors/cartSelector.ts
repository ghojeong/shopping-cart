import { ProductItemModel } from "models";
import { RootState } from "reducers";

interface ItemWithQuantity {
  product: ProductItemModel;
  quantity: number;
}
type ItemsWithQuantity = Record<ProductItemModel["id"], ItemWithQuantity>;
interface Cart {
  itemsWithQuantity: ItemsWithQuantity;
  cartItemsNum: number;
}
export const cartSelector = () => ({
  productItems: { items },
  cart: { cartItems, cartItemsNum }
}: RootState): Cart => {
  const itemsWithQuantity: ItemsWithQuantity = {};
  for (let id in cartItems) {
    itemsWithQuantity[id] = {
      product: items[id],
      quantity: cartItems[id].quantity
    };
  }
  return {
    itemsWithQuantity,
    cartItemsNum
  };
};
