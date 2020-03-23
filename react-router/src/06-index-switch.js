//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';
import About from './pages/about';
//引入css
import './index.css';
/*
switch:作用是每一个路由只匹配第一个匹配上的页面

switch 可以将404页放在switch标签的最下面,作为找不到的页面的跳转
*/
const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="" >首页</Link> &nbsp;
			<Link to="/about/1001">关于我们</Link> &nbsp;
			<Link to="/render">render页面</Link> &nbsp;
		</div>
		<div>
			<Switch>
				<Route path="/" exact={true} component={Main} />
				<Route path="/about/:pageid" component={About}/>
				<Route  path="/render"  render={()=><div>render页面</div>}/>
				<Route  render={()=><div>404页面</div>}/>
				<Route path="/:user" render={()=><div>传参页面</div>}/>
			</Switch>
		</div>
	</BrowserRouter>
)

//渲染
ReactDOM.render(<App />, document.getElementById('root'));



