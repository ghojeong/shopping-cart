import { createAsyncAction, ActionType } from "typesafe-actions";
import { CouponModel } from "models";

export const fetchCouponsAsync = createAsyncAction(
  "FETCH_COUPONS_REQUEST",
  "FETCH_COUPONS_SUCCESS",
  "FETCH_COUPONS_FAILURE"
)<
  void,
  CouponModel[],
  {
    errMsg: string;
  }
>();
export type CouponsActions = ActionType<typeof fetchCouponsAsync>;
