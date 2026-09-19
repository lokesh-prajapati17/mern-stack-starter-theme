import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
  Typography,
  Stack,
  useTheme,
  Tooltip,
} from "@mui/material";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

/**
 * Common DataTable Component with Sorting & Pagination (Arrow function)
 * Zero hardcoded colors/margins - strictly theme-driven.
 */
export const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  // Controlled Sorting
  sortColumn: externalSortColumn,
  sortDirection: externalSortDirection,
  onSort: externalOnSort,
  // Pagination Config
  pagination = null,
  emptyTitle = "No Records Found",
  emptyDescription = "There are currently no records to display.",
  onRowClick,
  sx,
}) => {
  const theme = useTheme();

  // Internal Sorting State (if not controlled externally)
  const [internalSortColumn, setInternalSortColumn] = useState(null);
  const [internalSortDirection, setInternalSortDirection] = useState("asc");

  const activeSortColumn =
    externalSortColumn !== undefined ? externalSortColumn : internalSortColumn;
  const activeSortDirection =
    externalSortDirection !== undefined
      ? externalSortDirection
      : internalSortDirection;

  const handleColumnSort = (col) => {
    if (!col.sortable) return;

    const newDirection =
      activeSortColumn === col.key && activeSortDirection === "asc"
        ? "desc"
        : "asc";

    if (externalOnSort) {
      externalOnSort(col.key, newDirection);
    } else {
      setInternalSortColumn(col.key);
      setInternalSortDirection(newDirection);
    }
  };

  // Internal Sorting Logic for data if not handled on server
  const sortedData = useMemo(() => {
    if (externalOnSort || !activeSortColumn) return data;

    return [...data].sort((a, b) => {
      let valA = a[activeSortColumn];
      let valB = b[activeSortColumn];

      if (valA === undefined || valA === null) valA = "";
      if (valB === undefined || valB === null) valB = "";

      if (typeof valA === "string") {
        return activeSortDirection === "asc"
          ? valA.localeCompare(String(valB))
          : String(valB).localeCompare(valA);
      }

      return activeSortDirection === "asc"
        ? valA > valB
          ? 1
          : -1
        : valA < valB
          ? 1
          : -1;
    });
  }, [data, activeSortColumn, activeSortDirection, externalOnSort]);

  // Render sort indicator icon
  const renderSortIcon = (col) => {
    if (!col.sortable) return null;

    let Icon = ArrowUpDown;
    let iconColor = theme.palette.text.disabled;
    let opacity = 0.55;

    if (activeSortColumn === col.key) {
      Icon = activeSortDirection === "asc" ? ArrowUp : ArrowDown;
      iconColor = theme.palette.primary.main;
      opacity = 1;
    }

    return (
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          verticalAlign: "middle",
          color: iconColor,
          opacity,
          transition: "color 0.15s ease, opacity 0.15s ease",
        }}
      >
        <Icon size={14} style={{ display: "block" }} />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        overflow: "hidden",
        ...sx,
      }}
    >
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 0,
          width: "100%",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <Table sx={{ minWidth: { xs: 540, sm: 650 } }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => {
                const headerContent = (
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                      lineHeight: 1,
                      verticalAlign: "middle",
                      justifyContent:
                        col.align === "right"
                          ? "flex-end"
                          : col.align === "center"
                            ? "center"
                            : "flex-start",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: theme.typography.caption.fontSize,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: 1,
                        color: "inherit",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {col.label}
                    </Typography>
                    {renderSortIcon(col)}
                  </Box>
                );

                return (
                  <TableCell
                    key={col.key}
                    align={col.align || "left"}
                    onClick={() => handleColumnSort(col)}
                    sx={{
                      width: col.width,
                      cursor: col.sortable ? "pointer" : "default",
                      userSelect: "none",
                      transition: "background-color 0.15s ease",
                      "&:hover": {
                        bgcolor: col.sortable ? "action.hover" : "inherit",
                      },
                    }}
                  >
                    {col.sortable ? (
                      <Tooltip
                        title={
                          activeSortColumn === col.key
                            ? activeSortDirection === "asc"
                              ? "Sorted ascending. Click to sort descending"
                              : "Sorted descending. Click to clear or sort ascending"
                            : `Click to sort by ${col.label}`
                        }
                        arrow
                        placement="top"
                      >
                        {headerContent}
                      </Tooltip>
                    ) : (
                      headerContent
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ py: 6 }}>
                  <Loader minHeight={160} message="Loading table data..." />
                </TableCell>
              </TableRow>
            ) : sortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ py: 6, border: "none" }}
                >
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                  />
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((row, rowIndex) => (
                <TableRow
                  key={row.id || row._id || rowIndex}
                  hover
                  onClick={() => onRowClick && onRowClick(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "inherit",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  {columns.map((col) => {
                    const cellValue = row[col.key];
                    return (
                      <TableCell key={col.key} align={col.align || "left"}>
                        {col.render
                          ? col.render(cellValue, row, rowIndex)
                          : cellValue !== undefined && cellValue !== null
                            ? String(cellValue)
                            : "—"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Bar */}
      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          rowsPerPage={pagination.rowsPerPage}
          rowsPerPageOptions={pagination.rowsPerPageOptions}
          onPageChange={pagination.onPageChange}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
        />
      )}
    </Box>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      align: PropTypes.oneOf(["left", "center", "right"]),
      render: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.oneOf(["asc", "desc"]),
  onSort: PropTypes.func,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func,
  }),
  emptyTitle: PropTypes.string,
  emptyDescription: PropTypes.string,
  onRowClick: PropTypes.func,
  sx: PropTypes.object,
};

export default DataTable;
