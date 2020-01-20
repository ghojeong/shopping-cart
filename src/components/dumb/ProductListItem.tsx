import React, { FC } from "react";
import { ProductItemModel } from "models";
import { numWithCommas } from "lib/format";

interface Props {
  item: ProductItemModel;
  onAddCart: (id: string) => void;
}
export const ProductListItem: FC<Props> = ({ item, onAddCart }) => (
  <div className="card product-card flex-fill" key={item.id}>
    <div className="card-img-left">
      <img src={item.coverImage} alt={"N/A"} />
    </div>

    <div className="card-body card-right">
      <span className="card-title">{item.title}</span>
      <p>
        <b>가격: {numWithCommas(item.price)} 원</b>
      </p>
      <button
        type="button"
        className="btn btn-add-cart"
        onClick={() => {
          onAddCart(item.id);
        }}
      >
        <i className="material-icons">담기</i>
      </button>
    </div>
  </div>
);
