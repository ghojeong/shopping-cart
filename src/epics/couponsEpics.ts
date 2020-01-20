import { of } from "rxjs";
import { map, filter, catchError, mergeMap } from "rxjs/operators";
import { ActionsObservable, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { Actions, fetchCouponsAsync } from "actions";
import * as service from "services";

type Service = typeof service;

export const fetchCouponsEpic: Epic = (
  actions$: ActionsObservable<Actions>,
  _,
  { couponService }: Service
) =>
  actions$.pipe(
    filter(isActionOf(fetchCouponsAsync.request)),
    mergeMap(() =>
      couponService.getCoupons().pipe(
        map(data => fetchCouponsAsync.success(data)),
        catchError(err =>
          of(
            fetchCouponsAsync.failure({
              errMsg: err.message
            })
          )
        )
      )
    )
  );
