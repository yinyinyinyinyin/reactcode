//仓库
//applyMiddleware 允许哪些中间件
import {createStore,applyMiddleware} from 'redux';
//引入路由中间件
import {routerMiddleware} from 'react-router-redux';
//引入history
import {createBrowserHistory} from 'history';
//引入纯函数
import rootReducer from './modules';
//创建历史
export const history = createBrowserHistory();
//创建仓库
export default createStore(rootReducer,applyMiddleware(routerMiddleware(history)));

