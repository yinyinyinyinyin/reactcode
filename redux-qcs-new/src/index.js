import React from 'react';
import ReactDOM from 'react-dom';
//引入插件
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store,{history} from './store';

import 'reset-css';
import 'antd/dist/antd.min.css';
import 'react-flexible';
import './index.css';




import App from './router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
	<ConnectedRouter history={history}>
		<App />
	</ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
