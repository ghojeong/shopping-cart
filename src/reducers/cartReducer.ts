import { getType } from "typesafe-actions";
import { ProductItemModel } from "models";
import {
  Actions,
  authLogout,
  addItemToCart,
  removeItemFromCart,
  addQuantity,
  subQuantity
} from "actions";

export interface CartState {
  cartItems: Record<ProductItemModel["id"], { quantity: number }>;
  cartItemsNum: number; // 장바구니에 담긴 상품 종류의 숫자 (총개수가 아님)
}
export const cartInitialState: CartState = {
  cartItems: {},
  cartItemsNum: 0
};

const hasAddedItem = (id: ProductItemModel["id"], cartState: CartState) =>
  cartState.cartItems[id] && cartState.cartItems[id].quantity > 0;

export const cartReducer = (
  cartState = cartInitialState,
  action: Actions
): CartState => {
  switch (action.type) {
    case getType(authLogout):
      return cartInitialState;
    case getType(addItemToCart):
      return {
        ...cartState,
        cartItems: {
          ...cartState.cartItems,
          [action.payload.id]: {
            ...cartState.cartItems[action.payload.id],
            quantity: hasAddedItem(action.payload.id, cartState)
              ? cartState.cartItems[action.payload.id].quantity + 1
              : 1
          }
        },
        cartItemsNum:
          cartState.cartItemsNum +
          (hasAddedItem(action.payload.id, cartState) ? 0 : 1)
      };
    case getType(removeItemFromCart):
      return {
        ...cartState,
        cartItems: {
          ...cartState.cartItems,
          [action.payload.id]: {
            ...cartState.cartItems[action.payload.id],
            quantity: 0
          }
        },
        cartItemsNum:
          cartState.cartItemsNum -
          (hasAddedItem(action.payload.id, cartState) ? 1 : 0)
      };
    case getType(addQuantity):
      return {
        ...cartState,
        cartItems: {
          ...cartState.cartItems,
          [action.payload.id]: {
            ...cartState.cartItems[action.payload.id],
            quantity: hasAddedItem(action.payload.id, cartState)
              ? cartState.cartItems[action.payload.id].quantity + 1
              : 1
          }
        },
        cartItemsNum:
          cartState.cartItemsNum +
          (hasAddedItem(action.payload.id, cartState) ? 0 : 1)
      };
    case getType(subQuantity):
      return {
        ...cartState,
        cartItems: {
          ...cartState.cartItems,
          [action.payload.id]: {
            ...cartState.cartItems[action.payload.id],
            quantity: hasAddedItem(action.payload.id, cartState)
              ? cartState.cartItems[action.payload.id].quantity - 1
              : 0
          }
        },
        cartItemsNum:
          cartState.cartItemsNum -
          (hasAddedItem(action.payload.id, cartState) &&
          cartState.cartItems[action.payload.id].quantity <= 1
            ? 1
            : 0)
      };
    default:
      return cartState;
  }
};
