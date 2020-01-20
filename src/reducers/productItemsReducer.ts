import { getType } from "typesafe-actions";
import keyBy from "lodash/keyBy";
import { ProductItemModel } from "models";
import { Actions, authLogout, fetchProductItemsAsync } from "actions";

export interface ProductItemsState {
  isLoading: boolean;
  errMsg: string;
  items: Record<ProductItemModel["id"], ProductItemModel>;
}
export const productItemsInitialState: ProductItemsState = {
  isLoading: false,
  errMsg: "",
  items: {}
};
export const productItemsReducer = (
  productItemsState = productItemsInitialState,
  action: Actions
): ProductItemsState => {
  switch (action.type) {
    case getType(authLogout):
      return productItemsInitialState;
    case getType(fetchProductItemsAsync.request):
      return {
        ...productItemsState,
        isLoading: true,
        errMsg: ""
      };
    case getType(fetchProductItemsAsync.success):
      return {
        ...productItemsState,
        isLoading: false,
        errMsg: "",
        items: keyBy(action.payload, "id")
      };
    case getType(fetchProductItemsAsync.failure):
      return {
        ...productItemsState,
        isLoading: false,
        errMsg: action.payload.errMsg
      };
    default:
      return productItemsState;
  }
};
