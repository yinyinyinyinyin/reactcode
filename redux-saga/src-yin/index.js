import React from 'react';
import ReactDOM from 'react-dom';
//添加 react-redux关联的包
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

//引入saga
import rootSaga from './saga';

import App from './router';
import * as serviceWorker from './serviceWorker';

//创建redux的仓库
import createStore,{history} from './store';
const store = createStore();
console.log(store);
store.runSaga(rootSaga);

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
