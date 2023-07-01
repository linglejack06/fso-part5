/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglable-content">
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  );
});
Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
