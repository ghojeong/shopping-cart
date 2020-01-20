import { combineReducers } from "redux";

import { CouponsState, couponsReducer } from "./couponsReducer";
import { ProductItemsState, productItemsReducer } from "./productItemsReducer";
import { CartState, cartReducer } from "./cartReducer";

export * from "./couponsReducer";
export * from "./productItemsReducer";
export * from "./cartReducer";

export interface RootState {
  coupons: CouponsState;
  productItems: ProductItemsState;
  cart: CartState;
}
export const rootReducer = combineReducers<RootState>({
  coupons: couponsReducer,
  productItems: productItemsReducer,
  cart: cartReducer
});
