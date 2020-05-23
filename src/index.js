import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'styles/index.scss';

window.logout = () => {
  localStorage.removeItem('access_token');
  window.location.reload();
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
