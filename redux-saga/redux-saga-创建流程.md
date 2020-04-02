##1. 先安装依赖
cnpm install --save react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux redux-logger redux-saga axios http-proxy-middleware@0.20.0 
或
npm install --save react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux redux-logger redux-saga axios http-proxy-middleware@0.20.0 

##2.创建页面
src/pages/main/index.js
```
import React ,{Component} from 'react';

class Main extends Component{
	render(){
		return (
			<div>首页</div>
		)
	}
}

export default Main;
```
src/pages/about/index.js
```
import React ,{Component} from 'react';

class About extends Component{
	render(){
		return (
			<div>关于我们</div>
		)
	}
}

export default About;
```

##3.创建路由 src/router/index.js
```
//写路由
import React from 'react';
//引入路由相关包
import {Link,Route} from 'react-router-dom';
//引入页面
import Main from '../pages/main';
import About from '../pages/about';
//定义路由表
const App = ()=>(
	<div>
		<div>
			<Link to="/">首页</Link>
			<Link to="/about">关于我们</Link>
		</div>
		<div>
			<Route path="/" exact={true} component={Main}/>
			<Route path="/about"  component={About}/>
		</div>
	</div>
)
//输出
export default App;
```

##4.创建了纯函数的模块 src/modules/index.js
```
import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';

//输出
export default combineReducers({
	routerReducer
})
```

## 5.修改src/index.js   特殊注意一下，因为使用了saga写法和原来不一样了
```
import React from 'react';
import ReactDOM from 'react-dom';
//添加 react-redux关联的包
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

//引入saga
import rootSaga from './saga';

import App from './router';
import * as serviceWorker from './serviceWorker';

//创建redux的仓库
import createStore,{history} from './store';
const store = createStore();
console.log(store);
store.runSaga(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

##6.增加 计数器的纯函数src/modules/jishuqi.js
```
const initState  = {count:25};

export default (state = initState,action )=>{
	switch(action.type){
		case 'INCREMENT':
			return {count:state.count+1};
		case 'DECREMENT':
			return {count:state.count-1};
		case 'INCREMENT_ASYNC'://延时加一
			return state;
		default:
			return state;
	}
}
```

##7.将添加的计数器纯函数的reducer添加到根节点
src/modules/index.js
```
import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';
//引入计数器的纯函数
import jishuqi from './jishuqi';

//输出
export default combineReducers({
	routerReducer,
	jishuqi
})
```

## 8.创建 异步操作的saga文件src/saga.js
```
import {put,call,take,fork,delay,takeEvery,all} from 'redux-saga/effects';
//延时两秒加一
function * incrementAsync(){
	yield delay(2000);
	yield put({type:'INCREMENT'});
}
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
```

##9.在首页上调用相关的操作  src/pages/main/index.js
```
import React ,{Component} from 'react';
//将ui组件转容器组件
import {connect} from 'react-redux';
class Main extends Component{
	render(){
		return (
			<div>
			<h3>计数器</h3>
			<div>计数器中的值是:{this.props.count}</div>,
			<button onClick={this.props.increment}>加一</button>
			<button onClick={this.props.incrementAsync}>延时加一</button>
			</div>
		)
	}
}
//将 redux中的state值和props的值进行映射
const mapStateToProps = state=>({
	count:state.jishuqi.count
})
const mapDispatchToProps = dispatch=>{
	return {
		increment:()=>{
			dispatch({
				type:'INCREMENT'
			})
		},
		incrementAsync:()=>{
			dispatch({
				type:'INCREMENT_ASYNC'
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
```


//需要写一个延时两秒减一的功能~

