//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route,Switch,Prompt} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';
import Set from './pages/hoc/set.js';
import Get1 from './pages/hoc/get1.js';
import Get2 from './pages/hoc/get2.js';
//高阶组件
//为什么要用高阶组件

const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="" >首页</Link> &nbsp;
			<Link to="/set" >设置缓存信息</Link> &nbsp;
			<Link to="/get1">获取缓存信息并且渲染出来</Link> &nbsp;
			<Link to="/get2">获取缓存信息</Link> &nbsp;
		</div>
		<div>
			<Switch>
				<Route path="/" exact={true} component={Main} />
				<Route path="/set" component={Set}/>
				<Route path="/get1" component={Get1}/>
				<Route path="/get2" component={Get2}/>
			</Switch>
		</div>
	</BrowserRouter>
)
//渲染
ReactDOM.render(<App />, document.getElementById('root'));



