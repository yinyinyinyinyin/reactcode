//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';
import About from './pages/about';
import QCSMain from './pages/qcs/qcsmain';
//引入css
import './index.css';
/*

*/
const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="" >首页</Link> &nbsp;
			<Link to="/about/1001">关于我们</Link> &nbsp;
			<Link to="/qcsmain">屈臣氏首页</Link> &nbsp;
		</div>
		<div>
			<Switch>
				<Route path="/" exact={true} component={Main} />
				<Route path="/about/:pageid" component={About}/>
				<Route  path="/qcsmain"  component={QCSMain}/>
			</Switch>
		</div>
	</BrowserRouter>
)

//渲染
ReactDOM.render(<App />, document.getElementById('root'));



