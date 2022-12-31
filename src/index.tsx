import React from 'react';

import ReactDOM from 'react-dom/client';
import 'index.scss';
import { Provider } from 'react-redux';

import { injectStore } from 'apis';
import { App } from 'App';
import { store } from 'store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

injectStore(store);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
