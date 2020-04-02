//处理异步操作的saga的内容
//引入工具方法
import {put,call,take,fork,delay,takeEvery,all} from 'redux-saga/effects';

/*
put:与redux中的dispatch相似,可以发出一个动作,且发出的动作都会被reducer接收
call :使用异步请求
take:监听action,返回值是监听到的action对象
fork :在非阻塞的调用中使用
delay :延时  ,1000,2000
takeEvery:语义相当于on,允许并发action
all:创建 effect的描述信息,用来命令中间件并行的运行多个effect,并且等待他们全部完成
*/

//延时两秒加一
function * incrementAsync(){
	yield delay(2000);
	yield put({type:'INCREMENT'});
}

//延时两秒减一的函数

/**
 * 监听对延时加一和延时减一的监听
 */
export function * watchCountAsync(){
	//延时加一
	yield takeEvery('INCREMENT_ASYNC',incrementAsync);
	//延时减一
	
}
export default function * rootSaga(){
	// while(true){
	// 	yield take('INCREMENT_ASYNC');//监听是否有延时加一的动作调用
	// 	yield fork(incrementAsync);//调用 延时两秒加一的函数
	// }
	yield all([
		watchCountAsync()
	])
}