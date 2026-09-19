import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import ThemeCustomization from "./themes";
import { BreakpointProvider } from "./contexts/BreakpointContext";

/**
 * Root App Component (Arrow function)
 */
export const App = () => {
  return (
    <ThemeCustomization>
      <BreakpointProvider>
        <RouterProvider router={router} />
      </BreakpointProvider>
    </ThemeCustomization>
  );
};

export default App;
