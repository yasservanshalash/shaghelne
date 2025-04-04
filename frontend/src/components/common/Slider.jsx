/**
 * Slider component that provides a compatibility layer between different slider implementations.
 * Currently uses rc-slider under the hood but provides an API similar to react-slider.
 */

import React from 'react';
import RCSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Custom styling for the slider to match the app's design language
import './Slider.css';

/**
 * Slider component that wraps rc-slider with an API similar to react-slider
 * for backward compatibility with existing code.
 * 
 * @param {Object} props - Component props
 * @param {number} props.min - Minimum value
 * @param {number} props.max - Maximum value
 * @param {number|Array} props.value - Current value (or array for range)
 * @param {Function} props.onChange - Change handler
 * @param {boolean} props.pearling - Whether to move adjacent handles (for range)
 * @param {boolean} props.minDistance - Minimum distance between handles (for range)
 * @param {boolean} props.withBars - Whether to show bars between handles
 * @param {Object} props.className - Additional class name
 * @param {Object} props.styles - Custom styles
 * @returns {React.Component} Slider component
 */
const Slider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  pearling,
  minDistance = 0,
  withBars = false,
  className = '',
  styles = {},
  ...rest
}) => {
  // Determine if we're using a range slider based on whether value is an array
  const isRange = Array.isArray(value);

  // Handle the onChange event to match the expected format
  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`custom-slider-wrapper ${className}`} style={styles}>
      <RCSlider
        range={isRange}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        pushable={pearling ? minDistance : false}
        trackStyle={withBars ? { backgroundColor: 'var(--color-primary, #4caf50)' } : {}}
        railStyle={{ backgroundColor: 'var(--color-background-secondary, #e5e5e5)' }}
        handleStyle={{
          borderColor: 'var(--color-primary, #4caf50)',
          backgroundColor: 'var(--color-primary, #4caf50)',
        }}
        {...rest}
      />
    </div>
  );
};

export default Slider; 