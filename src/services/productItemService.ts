import { Observable, Subscriber } from "rxjs";
import { productItems } from "assets/productItems";
import { ProductItemModel } from "models";

export const productItemsService = {
  getProductItems(): Observable<ProductItemModel[]> {
    return new Observable((subscriber: Subscriber<ProductItemModel[]>) => {
      setTimeout(() => {
        subscriber.next(productItems);
        subscriber.complete();
      }, 1000);
    });
  }
};
