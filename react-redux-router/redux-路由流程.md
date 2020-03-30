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