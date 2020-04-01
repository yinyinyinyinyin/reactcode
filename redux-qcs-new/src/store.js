//创建仓库
import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
//引入纯函数
import rootReducer from './modules';

//输出history 
export const history = createBrowserHistory();
export default createStore(rootReducer,applyMiddleware(routerMiddleware(history),thunk,logger));
	