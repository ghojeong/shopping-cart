import React, { FC } from "react";
import { ProductItemModel } from "models";
import { ProductListItem } from "components";

interface Props {
  items: Record<ProductItemModel["id"], ProductItemModel>;
}
export const ProductList: FC<Props> = ({ items }) => (
  <>
    {Object.keys(items).map(key => {
      const product = items[key];
      return <ProductListItem key={product.id} item={product} />;
    })}
  </>
);
