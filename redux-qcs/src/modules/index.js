import {combineReducers}  from 'redux';
import {routerReducer} from 'react-router-redux';

//引入数据的子树
import qcsdata from './qcsdata';
export default combineReducers({
	routerReducer,
	qcsdata
})