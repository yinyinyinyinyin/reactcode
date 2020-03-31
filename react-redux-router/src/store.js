//仓库
//applyMiddleware 允许哪些中间件
import {createStore,applyMiddleware,compose} from 'redux';
//引入路由中间件
import {routerMiddleware} from 'react-router-redux';
//引入异步操作的中间件
import thunk from 'redux-thunk';
//引入日志的中间件,
import logger from 'redux-logger';
//引入history
import {createBrowserHistory} from 'history';
//引入纯函数
import rootReducer from './modules';

//引入devtools
import DevTools from './containers/DevTools.js';

//创建历史
export const history = createBrowserHistory();
//创建仓库
//注意:logger的中间件需要放在允许中间件的最后一个
export default createStore(
	rootReducer,
	compose(
		applyMiddleware(routerMiddleware(history),thunk,logger),
		DevTools.instrument()
	)
);

