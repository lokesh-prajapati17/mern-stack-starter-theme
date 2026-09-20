import React, { Suspense } from "react";
import Loader from "./Loader";

/**
 * Loadable HOC (Arrow function)
 * Wraps dynamic lazy imports with a global Suspense fallback loader.
 */
export const Loadable =
  (Component, options = {}) =>
  (props) => {
    const message =
      typeof options === "string"
        ? options
        : options?.message || "Loading application view...";
    return (
      <Suspense fallback={<Loader fullPage message={message} />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default Loadable;
