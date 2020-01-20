import { AuthAction } from "./authActions";
import { CartActions } from "./cartActions";
import { CouponsAction } from "./couponsActions";
import { ProductItemsAction } from "./productItemsActions";

export * from "./authActions";
export * from "./cartActions";
export * from "./couponsActions";
export * from "./productItemsActions";

export type Actions =
  | AuthAction
  | CartActions
  | CouponsAction
  | ProductItemsAction;
