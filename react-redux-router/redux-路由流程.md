##1.安装依赖
redux-thunk 异步操作中间件
redux-logger 日志中间件
react-router-redux 路由中间件
npm install --save redux react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux-thunk redux-logger
或者
cnpm install --save redux react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux-thunk redux-logger

##2.创建了页面
src/pages/main.js
```
import React ,{Component} from 'react';
class Main extends Component{
	render(){
		return (
		<div>首页</div>
		)
	}
}
export default  Main;
```

src/pages/about.js
```
import React ,{Component} from 'react';
class About extends Component{
	render(){
		return (
		<div>关于我们</div>
		)
	}
}
export default  About;
```

##3.创建路由 src/router.js
```
import React from 'react';
import {Link,Route} from 'react-router-dom';
//引入页面
import Main from './pages/main';
import About from './pages/about';
//定义路由表
const App = ()=>(
	<div>
		<div>
			<Link to="/">首页</Link>
			<Link to="/about">关于我们</Link>
		</div>
		<div>
			<Route path="/" exact={true} component={Main}/>
			<Route path="/about" component={About}/>
		</div>
	</div>
)
export default App;
```
##4.修改  src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
//引入react和redux关联的库

//Provider 使用它包裹的组件都可以获取到store中的数据
import {Provider} from 'react-redux';

//引入redux的路由插件
import {ConnectedRouter} from 'react-router-redux';

//引入路由
import App from './router';

//引入store的仓库
import store ,{history} from './store';

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>
  ,
  document.getElementById('root')
);
```
##5.创建 store文件，填写内容  src/store.js
```
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
```
##6.创建纯函数 src/modules/index.js
```
//合并状态数
import {combineReducers} from 'redux';

//引入路由的状态数
import {routerReducer} from 'react-router-redux';

export default combineReducers({
	routerReducer
})
```

## 7.将 ui组件转容器组件
	--7.1 创建纯函数和动作的js src/modules/jishuqi.js
```
//计数器的状态树
//初始化
//纯函数
const initState = {count:15};
export default (state = initState,action)=>{
	switch (action.type){
		case 'INCREMENT'://增加
			return {count:state.count+1};
		case 'DECREMENT'://减少
			return {count:state.count-1};
		default:
			return state;
	}
}

//动作
//加一动作
export const increment = ()=>{
	return {
		type:'INCREMENT'
	}
}
//减一的动作
export const decrement = ()=>{
	return {
		type:'DECREMENT'
	}
}
	```
	
	--7.2 将 计数器的子树添加到 store中 修改src/modules/index.js
```
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
	```
	--7.3 修改页面，将ui组件转容器组件 src/pages/main.js
	
```
import React ,{Component} from 'react';
//将ui组件转容器组件
import {connect} from 'react-redux';
//绑定动作
import {bindActionCreators} from 'redux';

//引入动作
import {increment} from '../modules/jishuqi';

class Main extends Component{
	render(){
		return (
		<div>
			<h3>计数器</h3>
			<button onClick={this.props.increment}>++</button><br/>
			<button>--</button>
			num的值为:{this.props.count}
		</div>
		)
	}
}

//将 store中的状态值和props中的值进行映射,等同于vuex中的工具方法,相当于  get
const mapStateToProps = state =>({
	count:state.jishuqi.count	
})

//将我们的store中的dispatch 和 props中的事件进行映射  ,相当于 set
const mapDispatchToProps = dispatch=>bindActionCreators({
	increment
},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(Main);
	```
## 8.redux 异步操作
	--8.1 在 src/modules/jishuqi.js 添加新的异步动作
```
//延时加一
export const incrementSync = ()=>{
	return dispatch=>{
		return setTimeout(()=>{
			dispatch({
				type:'INCREMENT'
			})
		},1000)
	}
}
	```
	--8.2 需要在 src/store.js 中添加异步操作的中间件和日志的中间件
```
//引入异步操作的中间件
import thunk from 'redux-thunk';
//引入日志的中间件,
import logger from 'redux-logger';

//注意:logger的中间件需要放在允许中间件的最后一个
export default createStore(rootReducer,applyMiddleware(routerMiddleware(history),thunk,logger));
	```
	--8.3 需要在main页面添加相应的异步事件
```
//引入动作
import {increment,incrementSync} from '../modules/jishuqi';


<button onClick={this.props.incrementSync}>延时1秒加一</button>

//将我们的store中的dispatch 和 props中的事件进行映射  ,相当于 set
const mapDispatchToProps = dispatch=>bindActionCreators({
	increment,incrementSync
},dispatch);
	```