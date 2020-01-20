import { createAsyncAction, ActionType } from "typesafe-actions";
import { ProductItemModel } from "models";

export const fetchProductItemsAsync = createAsyncAction(
  "FETCH_PRODUCT_ITEMS_REQUEST",
  "FETCH_PRODUCT_ITEMS_SUCCESS",
  "FETCH_PRODUCT_ITEMS_FAILURE"
)<
  void,
  ProductItemModel[],
  {
    errMsg: string;
  }
>();
export type ProductItemsActions = ActionType<typeof fetchProductItemsAsync>;
