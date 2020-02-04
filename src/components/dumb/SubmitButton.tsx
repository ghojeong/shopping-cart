import React, { FC } from "react";

interface Props {
  disabled: boolean;
}
export const SubmitButton: FC<Props> = ({ disabled, children }) => (
  <div className="submit my-3">
    <button className="btn btn-add-cart" disabled={disabled}>
      {children}
    </button>
  </div>
);
