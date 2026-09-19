import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { UploadCloud, FileText, X } from "lucide-react";

/**
 * FileDropzone — Drag-and-drop file upload zone.
 * Integrates seamlessly with react-dropzone or can be used standalone.
 */
export const FileDropzone = ({
  onDrop,
  accept,
  multiple = false,
  disabled = false,
  files = [],
  onRemove,
  helperText,
  error = false,
  sx,
}) => {
  const theme = useTheme();
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const dropped = Array.from(e.dataTransfer.files);
      if (onDrop) onDrop(multiple ? dropped : [dropped[0]]);
    },
    [disabled, multiple, onDrop],
  );

  const handleBrowse = (e) => {
    const selected = Array.from(e.target.files || []);
    if (onDrop) onDrop(multiple ? selected : [selected[0]]);
    e.target.value = "";
  };

  const borderColor = error
    ? theme.palette.error.main
    : isDragOver
      ? theme.palette.primary.main
      : theme.palette.divider;

  return (
    <Box sx={sx}>
      {/* Drop zone */}
      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        component="label"
        htmlFor="file-dropzone-input"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.25,
          p: 4,
          borderRadius: (t) => `${t.shape.borderRadius}px`,
          border: `2px dashed ${borderColor}`,
          bgcolor: isDragOver
            ? alpha(theme.palette.primary.main, 0.06)
            : error
              ? alpha(theme.palette.error.main, 0.04)
              : "action.hover",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          "&:hover": disabled
            ? {}
            : {
                border: `2px dashed ${theme.palette.primary.main}`,
                bgcolor: alpha(theme.palette.primary.main, 0.06),
              },
        }}
      >
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
          }}
        >
          <UploadCloud size={26} />
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" fontWeight={600}>
            Drop files here or{" "}
            <Typography component="span" color="primary" fontWeight={700}>
              browse
            </Typography>
          </Typography>
          {helperText && (
            <Typography
              variant="caption"
              color={error ? "error" : "text.secondary"}
              display="block"
              sx={{ mt: 0.4 }}
            >
              {helperText}
            </Typography>
          )}
        </Box>

        <input
          id="file-dropzone-input"
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={handleBrowse}
          style={{ display: "none" }}
        />
      </Box>

      {/* File list */}
      {files.length > 0 && (
        <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
          {files.map((file, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1,
                borderRadius: 1.5,
                border: (t) => `1px solid ${t.palette.divider}`,
                bgcolor: "background.paper",
              }}
            >
              <FileText size={16} color={theme.palette.primary.main} />
              <Typography variant="body2" fontWeight={500} sx={{ flex: 1 }} noWrap>
                {file.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(file.size / 1024).toFixed(1)} KB
              </Typography>
              {onRemove && (
                <Box
                  component="button"
                  onClick={() => onRemove(idx)}
                  sx={{
                    display: "flex",
                    p: 0.25,
                    border: "none",
                    bgcolor: "transparent",
                    cursor: "pointer",
                    color: "text.secondary",
                    borderRadius: 0.5,
                    "&:hover": { color: "error.main" },
                  }}
                >
                  <X size={14} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

FileDropzone.propTypes = {
  onDrop: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  onRemove: PropTypes.func,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  sx: PropTypes.object,
};

export default FileDropzone;
