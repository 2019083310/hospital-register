import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// 样式重置相关
import 'normalize.css'
import './assets/less/index.less'

import store from './store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Suspense fallback='loading'>
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>
  /* </React.StrictMode> */
);