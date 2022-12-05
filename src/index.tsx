import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.scss';
import {App} from 'App';
import {Provider} from "react-redux";
import {store} from "store/store";
import {BrowserRouter} from "react-router-dom";
import {injectStore} from "apis/instance/instance";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
injectStore(store);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);
