##1.创建项目
e:
cd www
create-react-app web21-redux-qcs

##2.安装依赖
npm install --save redux react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux-thunk redux-logger
npm install --save react-router-dom axios http-proxy-middleware react-flexible swiper@3.4.2 antd reset-css
npm install --save-dev scss scss-loader node-sass
npm install --save react@16.4.1 react-dom@16.4.1
或者
cnpm install --save redux react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux-thunk redux-logger
cnpm install --save react-router-dom axios http-proxy-middleware react-flexible swiper@3.4.2 antd reset-css
cnpm install --save-dev scss scss-loader node-sass
cnpm install --save react@16.4.1 react-dom@16.4.1

## 3.创建redux的路由及redux的状态管理器
	-- 3.1 创建了4个页面
src/pages/main/index.js	
```
import React,{Component} from 'react';
class Main extends Component{
	render(){
		return (
			<div>首页</div>
		)
	}
}

export default Main;
```
src/pages/good/index.js	
```
import React,{Component} from 'react';
class Good extends Component{
	render(){
		return (
			<div>潮流好物</div>
		)
	}
}

export default Good;
```
src/pages/global/index.js	
```
import React,{Component} from 'react';
class Global extends Component{
	render(){
		return (
			<div>购全球</div>
		)
	}
}

export default Global;
```
src/pages/mask/index.js	
```
import React,{Component} from 'react';
class Mask extends Component{
	render(){
		return (
			<div>面膜中心</div>
		)
	}
}

export default Mask;
```

	--3.2创建路由文件 src/router/index.js
```
//路由
import React from 'react';
import {Link,Route} from 'react-router-dom';
//引入页面
import Main from '../pages/main';
import Mask from '../pages/mask';
import Good from '../pages/good';
import Global from '../pages/global';

//定义路由表
const App = ()=>(
<div>
	<div>
		<Link to="/">今日推荐</Link>
		<Link to="/mask">面膜中心</Link>
		<Link to="/good">潮流好物</Link>
		<Link to="/global">购全球</Link>
	</div>
	<div>
		<Route path="/" exact={true} component={Main} />
		<Route path="/mask" component={Mask} />
		<Route path="/good" component={Good} />
		<Route path="/global" component={Global} />
	</div>
</div>
)

export default App;
```
--3.3 修改 src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store,{history} from './store';

import './index.css';
import App from './router';
import * as serviceWorker from './serviceWorker';

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
	--3.4 创建 src/store.js
```
//创建仓库
import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
//引入纯函数
import rootReducer from './modules';

//输出history 
export const history = createBrowserHistory();
export default createStore(rootReducer,applyMiddleware(routerMiddleware(history),thunk,logger));
	```
	--3.5 创建 src/modules/index.js
```
import {combineReducers}  from 'redux';
import {routerReducer} from 'react-router-redux';
export default combineReducers({
	routerReducer
})
	```

	
 	