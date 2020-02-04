import { Observable, Subscriber } from "rxjs";
import { coupons } from "assets/coupons";
import { CouponModel } from "models";

export const couponService = {
  getCoupons(): Observable<CouponModel[]> {
    let id = 1;
    return new Observable((subscriber: Subscriber<CouponModel[]>) => {
      setTimeout(() => {
        subscriber.next(
          coupons.map(coupon => {
            id++;
            return {
              ...coupon,
              id: String(id)
            };
          })
        );
        subscriber.complete();
      }, 500);
    });
  }
};
