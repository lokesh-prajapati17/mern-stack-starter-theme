import Button from "./Button";
import Card from "./Card";
import Paper from "./Paper";
import Table from "./Table";
import Input from "./Input";
import Chip from "./Chip";
import Dialog from "./Dialog";
import Drawer from "./Drawer";
import AppBar from "./AppBar";
import Tabs from "./Tabs";
import Tooltip from "./Tooltip";
import Switch from "./Switch";
import Badge from "./Badge";
import Typography from "./Typography";

/**
 * Component Overrides Master Aggregator (Arrow function)
 * @param {import('@mui/material').Theme} theme
 */
export const componentOverrides = (theme) => {
  return {
    ...Button(theme),
    ...Card(theme),
    ...Paper(theme),
    ...Table(theme),
    ...Input(theme),
    ...Chip(theme),
    ...Dialog(theme),
    ...Drawer(theme),
    ...AppBar(theme),
    ...Tabs(theme),
    ...Tooltip(theme),
    ...Switch(theme),
    ...Badge(theme),
    ...Typography(theme),
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            width: "0px !important",
            height: "0px !important",
            display: "none !important",
            background: "transparent !important",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent !important",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent !important",
          },
        },
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          height: "100%",
          width: "100%",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        body: {
          height: "100%",
          width: "100%",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "#root": {
          height: "100%",
          width: "100%",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "::-webkit-scrollbar": {
          width: "0px !important",
          height: "0px !important",
          display: "none !important",
        },
        "::-webkit-scrollbar-track": {
          background: "transparent !important",
        },
        "::-webkit-scrollbar-thumb": {
          background: "transparent !important",
        },
      },
    },
  };
};

export default componentOverrides;
