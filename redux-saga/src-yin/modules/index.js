import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';
//引入计数器的纯函数
import jishuqi from './jishuqi';
//引入获取数据的纯函数
import qcsdata from './qcsdata';
//输出
export default combineReducers({
	routerReducer,
	jishuqi,
	qcsdata
})