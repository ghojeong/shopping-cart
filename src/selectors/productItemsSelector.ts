import orderBy from "lodash/orderBy";
import { ProductItemModel } from "models";
import { RootState, ProductItemsState } from "reducers";

export const productItemsSelector = () => ({
  productItems
}: RootState): ProductItemsState => productItems;

export const productItemsWithOrderSelector = () => ({
  productItems
}: RootState): ProductItemsState => ({
  ...productItems,
  items: orderBy(productItems.items, ["score"], ["desc"])
});

export const productItemByIdSelector = (id: ProductItemModel["id"]) => ({
  productItems
}: RootState) => ({
  isLoading: productItems.isLoading,
  errMsg: productItems.errMsg,
  item: productItems.items && productItems.items[id]
});
