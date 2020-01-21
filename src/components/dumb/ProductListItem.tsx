import React, { FC } from "react";
import { ProductItemModel } from "models";
import { AddRemoveButton } from "components";
import { numWithCommas } from "lib/format";

interface Props {
  item: ProductItemModel;
}
export const ProductListItem: FC<Props> = ({ item }) => (
  <div className="card product-card flex-fill" key={item.id}>
    <div className="card-img-left">
      <img src={item.coverImage} alt={"N/A"} />
    </div>

    <div className="card-body card-right">
      <span className="card-title">{item.title}</span>
      <p>
        <b>가격: {numWithCommas(item.price)} 원</b>
      </p>
      <AddRemoveButton id={item.id} />
    </div>
  </div>
);
