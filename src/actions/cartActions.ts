import { createAction, ActionType } from "typesafe-actions";
import { ProductItemModel } from "models";

type ItemInfo = { id: ProductItemModel["id"] };
export const addItemToCart = createAction("ADD_ITEM_TO_CART")<ItemInfo>();
export const removeItemFromCart = createAction("REMOVE_ITEM_FROM_CART")<
  ItemInfo
>();
export const addQuantity = createAction("ADD_QUANTITY")<ItemInfo>();
export const subQuantity = createAction("SUB_QUANTITY")<ItemInfo>();
export const checkItem = createAction("CHECK_ITEM")<ItemInfo>();
export const uncheckItem = createAction("UNCHECK_ITEM")<ItemInfo>();
export const checkAllItems = createAction("CHECK_ALL_ITEMS")();
export const uncheckAllItems = createAction("UNCHECK_ALL_ITEMS")();

export type CartActions =
  | ActionType<typeof addItemToCart>
  | ActionType<typeof removeItemFromCart>
  | ActionType<typeof addQuantity>
  | ActionType<typeof subQuantity>
  | ActionType<typeof checkItem>
  | ActionType<typeof uncheckItem>
  | ActionType<typeof checkAllItems>
  | ActionType<typeof uncheckAllItems>;
