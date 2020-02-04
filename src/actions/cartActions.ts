import { createAction, ActionType } from "typesafe-actions";
import { ProductItemModel, CouponModel } from "models";

interface ItemInfo {
  id: ProductItemModel["id"];
}
interface CouponInfo {
  id: CouponModel["id"];
}
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
export const checkCoupon = createAction("CHECK_COUPON")<CouponInfo>();
export const uncheckCoupon = createAction("UNCHECK_COUPON")<CouponInfo>();
export const checkAllCoupons = createAction("CHECK_ALL_COUPONS")();
export const uncheckAllCoupons = createAction("UNCHECK_ALL_COUPONS")();

export type CartActions =
  | ActionType<typeof addItemToCart>
  | ActionType<typeof removeItemFromCart>
  | ActionType<typeof addQuantity>
  | ActionType<typeof subQuantity>
  | ActionType<typeof checkItem>
  | ActionType<typeof uncheckItem>
  | ActionType<typeof checkAllItems>
  | ActionType<typeof uncheckAllItems>
  | ActionType<typeof checkCoupon>
  | ActionType<typeof uncheckCoupon>
  | ActionType<typeof checkAllCoupons>
  | ActionType<typeof uncheckAllCoupons>;
