import { Observable, Subscriber } from "rxjs";
import { coupons } from "assets/coupons";
import { CouponModel } from "models";

export const couponService = {
  getCoupons(): Observable<CouponModel[]> {
    return new Observable((subscriber: Subscriber<CouponModel[]>) => {
      subscriber.next(coupons);
      subscriber.complete();
    });
  }
};
