import React, { Suspense } from 'react';
import Loader from './Loader';

/**
 * Loadable HOC (Arrow function)
 * Wraps dynamic lazy imports with a global Suspense fallback loader.
 */
export const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader fullPage message="Loading application view..." />}>
    <Component {...props} />
  </Suspense>
);

export default Loadable;
