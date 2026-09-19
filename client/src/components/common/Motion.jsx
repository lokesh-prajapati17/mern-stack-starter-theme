import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export const MotionFadeIn = ({
  children,
  delay = 0,
  duration = 0.35,
  style,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration, delay, ease: "easeOut" }}
    style={{ width: "100%", ...style }}
    {...props}
  >
    {children}
  </motion.div>
);

MotionFadeIn.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  duration: PropTypes.number,
  style: PropTypes.object,
};

export const MotionSlideUp = ({
  children,
  delay = 0,
  duration = 0.4,
  distance = 20,
  style,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: distance }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: distance }}
    transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    style={{ width: "100%", ...style }}
    {...props}
  >
    {children}
  </motion.div>
);

MotionSlideUp.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  duration: PropTypes.number,
  distance: PropTypes.number,
  style: PropTypes.object,
};

export const MotionScale = ({
  children,
  delay = 0,
  duration = 0.3,
  style,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration, delay, ease: "easeOut" }}
    style={{ width: "100%", ...style }}
    {...props}
  >
    {children}
  </motion.div>
);

MotionScale.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  duration: PropTypes.number,
  style: PropTypes.object,
};
