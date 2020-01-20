import { combineEpics } from "redux-observable";

import { fetchCouponsEpic } from "./couponsEpics";
import { fetchProductItemsEpic } from "./productItemsEpics";

export * from "./couponsEpics";
export * from "./productItemsEpics";

export const rootEpic = combineEpics(fetchCouponsEpic, fetchProductItemsEpic);
