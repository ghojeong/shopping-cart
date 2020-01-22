import React from "react";

export const Spinner = () => (
  <div
    style={{
      width: "100%",
      paddingLeft: "50%"
    }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);
