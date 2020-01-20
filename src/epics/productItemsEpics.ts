import { of } from "rxjs";
import { map, filter, catchError, mergeMap } from "rxjs/operators";
import { ActionsObservable, Epic } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import { Actions, fetchProductItemsAsync } from "actions";
import * as service from "services";

type Service = typeof service;

export const fetchProductItemsEpic: Epic = (
  actions$: ActionsObservable<Actions>,
  _,
  { productItemsService }: Service
) =>
  actions$.pipe(
    filter(isActionOf(fetchProductItemsAsync.request)),
    mergeMap(() =>
      productItemsService.getProductItems().pipe(
        map(data => fetchProductItemsAsync.success(data)),
        catchError(err =>
          of(
            fetchProductItemsAsync.failure({
              errMsg: err.message
            })
          )
        )
      )
    )
  );
