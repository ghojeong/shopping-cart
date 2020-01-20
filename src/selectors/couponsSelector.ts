import { RootState, CouponsState } from "reducers";

export const couponsSelector = () => ({ coupons }: RootState): CouponsState =>
  coupons;
