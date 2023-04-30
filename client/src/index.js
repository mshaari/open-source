import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Context from './components/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);

// Changed from unregister() to register() to enable service worker
serviceWorkerRegistration.register();
