import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { createCustomTheme } from './createTheme';
import { selectCustomization } from '../store/slices/customizationSlice';

/**
 * Theme Customization Provider (Arrow function)
 */
export const ThemeCustomization = ({ children }) => {
  const customization = useSelector(selectCustomization);
  const theme = useMemo(
    () => createCustomTheme(customization.mode, customization),
    [customization]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

export default ThemeCustomization;
