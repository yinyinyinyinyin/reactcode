import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';
import jishuqi from './jishuqi';
import qcsdata from './qcsdata';
//输出
export default combineReducers({
	routerReducer,
	jishuqi,
	qcsdata
})