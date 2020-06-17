import React from 'react';

const Loading = ({ page, invert }) => (
  <div className={`loading-container${page ? ' page' : ''}`}>
    <div className={`loader${invert ? ' invert' : ''}`} />
  </div>
);

export default Loading;
