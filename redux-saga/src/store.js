import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
//引入saga  
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
//引入纯函数
import  rootReducer from './modules';

export const history = createBrowserHistory();

//输出需要创建的仓库
export default function configStore(initialState){
	//调用saga的中间件
	const sagaMiddleware = createSagaMiddleware();
	return {...createStore(rootReducer,initialState,applyMiddleware(routerMiddleware(history),sagaMiddleware,logger)),
	runSaga:sagaMiddleware.run
	}
}