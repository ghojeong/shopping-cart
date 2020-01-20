import { createAction, ActionType } from "typesafe-actions";

export const authLogin = createAction("AUTH_LOGIN")();
export const authLogout = createAction("AUTH_LOGOUT")();
export const authCheckToken = createAction("AUTH_CHECK_TOKEN")();

export type AuthActions =
  | ActionType<typeof authLogin>
  | ActionType<typeof authLogout>
  | ActionType<typeof authCheckToken>;
