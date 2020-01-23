import { getType } from "typesafe-actions";
import mapValues from "lodash/mapValues";
import { ProductItemModel } from "models";
import {
  Actions,
  authLogout,
  addItemToCart,
  removeItemFromCart,
  addQuantity,
  subQuantity,
  checkItem,
  uncheckItem,
  checkAllItems,
  uncheckAllItems
} from "actions";

export interface CartState {
  cartItemsState: Record<
    ProductItemModel["id"],
    { checked: boolean; quantity: number }
  >;
  cartItemsNum: number; // 장바구니에 담긴 상품 종류의 숫자 (총개수가 아님)
}
export const cartInitialState: CartState = {
  cartItemsState: {},
  cartItemsNum: 0
};

const hasAddedItem = (id: ProductItemModel["id"], cartState: CartState) =>
  cartState.cartItemsState[id] && cartState.cartItemsState[id].quantity > 0;

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
        cartItemsState: {
          ...cartState.cartItemsState,
          [action.payload.id]: {
            ...cartState.cartItemsState[action.payload.id],
            checked: true,
            quantity: hasAddedItem(action.payload.id, cartState)
              ? cartState.cartItemsState[action.payload.id].quantity + 1
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
        cartItemsState: {
          ...cartState.cartItemsState,
          [action.payload.id]: {
            ...cartState.cartItemsState[action.payload.id],
            checked: true,
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
        cartItemsState: {
          ...cartState.cartItemsState,
          [action.payload.id]: {
            ...cartState.cartItemsState[action.payload.id],
            checked: true,
            quantity: hasAddedItem(action.payload.id, cartState)
              ? cartState.cartItemsState[action.payload.id].quantity + 1
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
        cartItemsState: {
          ...cartState.cartItemsState,
          [action.payload.id]: {
            ...cartState.cartItemsState[action.payload.id],
            checked: true,
            quantity: hasAddedItem(action.payload.id, cartState)
              ? cartState.cartItemsState[action.payload.id].quantity - 1
              : 0
          }
        },
        cartItemsNum:
          cartState.cartItemsNum -
          (hasAddedItem(action.payload.id, cartState) &&
          cartState.cartItemsState[action.payload.id].quantity <= 1
            ? 1
            : 0)
      };
    case getType(checkItem):
      return {
        ...cartState,
        cartItemsState: {
          ...cartState.cartItemsState,
          [action.payload.id]: {
            ...cartState.cartItemsState[action.payload.id],
            checked: true
          }
        }
      };
    case getType(uncheckItem):
      return {
        ...cartState,
        cartItemsState: {
          ...cartState.cartItemsState,
          [action.payload.id]: {
            ...cartState.cartItemsState[action.payload.id],
            checked: false
          }
        }
      };
    case getType(checkAllItems):
      return {
        ...cartState,
        cartItemsState: mapValues(cartState.cartItemsState, cartItemState => ({
          ...cartItemState,
          checked: true
        }))
      };
    case getType(uncheckAllItems):
      return {
        ...cartState,
        cartItemsState: mapValues(cartState.cartItemsState, cartItemState => ({
          ...cartItemState,
          checked: false
        }))
      };
    default:
      return cartState;
  }
};
