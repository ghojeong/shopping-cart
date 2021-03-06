import { getType } from "typesafe-actions";
import keyBy from "lodash/keyBy";
import { CouponModel } from "models";
import { Actions, authLogout, fetchCouponsAsync } from "actions";

export interface CouponsState {
  isLoading: boolean;
  errMsg: string;
  coupons: Record<CouponModel["id"], CouponModel>;
}
export const couponsInitialState: CouponsState = {
  isLoading: false,
  errMsg: "",
  coupons: {}
};
export const couponsReducer = (
  couponsState = couponsInitialState,
  action: Actions
): CouponsState => {
  switch (action.type) {
    case getType(authLogout):
      return couponsInitialState;
    case getType(fetchCouponsAsync.request):
      return {
        ...couponsInitialState,
        isLoading: true
      };
    case getType(fetchCouponsAsync.success):
      return {
        ...couponsState,
        isLoading: false,
        errMsg: "",
        coupons: keyBy(action.payload, "id")
      };
    case getType(fetchCouponsAsync.failure):
      return {
        ...couponsState,
        isLoading: false,
        errMsg: action.payload.errMsg
      };
    default:
      return couponsState;
  }
};
