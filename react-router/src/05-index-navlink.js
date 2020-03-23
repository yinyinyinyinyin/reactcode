//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,NavLink,Route} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';
import About from './pages/about';
//引入css
import './index.css';
/*
激活状态链接:
1.需要使用 NavLink
2.在该标签中添加  activeClassName={"active"}
3.对 .active进行设置

*/
const App = ()=>(
	<BrowserRouter>
		<div>
			<NavLink to="/" exact={true} activeClassName={"active"}>首页</NavLink> &nbsp;
			<NavLink to="/about/1001">关于我们</NavLink> &nbsp;
			<NavLink to="/render">render页面</NavLink> &nbsp;
		</div>
		<div>
			<Route path="/" exact={true} component={Main} />
			<Route path="/about/:pageid" component={About}/>
			<Route  path="/render"  render={()=><div>render页面</div>}/>
		</div>
	</BrowserRouter>
)

//渲染
ReactDOM.render(<App />, document.getElementById('root'));



