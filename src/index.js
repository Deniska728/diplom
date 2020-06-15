import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/index.scss';

window.logout = () => {
  localStorage.removeItem('access_token');
  window.location.reload();
};

ReactDOM.render(<App />, document.getElementById('root'));
