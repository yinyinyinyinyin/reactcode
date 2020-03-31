//合并状态树
import {combineReducers} from 'redux';

//引入路由的状态树
import {routerReducer} from 'react-router-redux';

//引入计数器的子树
import jishuqi from './jishuqi.js';
export default combineReducers({
	routerReducer,
	jishuqi
})