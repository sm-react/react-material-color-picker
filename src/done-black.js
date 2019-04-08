import React from 'react';
import PropTypes from 'prop-types';

export const Done = ({ color }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ width: '100%', height: '100%' }}
    >
        <path fill="none" d="M0 0h24v24H0z" />
        <path fill={color} d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </svg>
);

Done.propTypes = {
    color: PropTypes.string.isRequired,
};

