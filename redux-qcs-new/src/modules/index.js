//合并 reducer  
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
//添加获取数据的子树
import qcsdata from './qcsdata';
export default combineReducers({
	routerReducer,
	qcsdata
})