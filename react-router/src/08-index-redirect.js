//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route,Switch,Redirect} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';

//设定一个变量保存登录状态
let loginType = false;//未登录状态
/*需求:当没有登录时,不允许进入用户中心页面*/

//Redirect 当页面刚进入时的路由守卫.一般 守卫的对象是 用户中心或购物车

const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="" >首页</Link> &nbsp;
			<Link to="/login">登录</Link> &nbsp;
			<Link to="/center">个人中心</Link> &nbsp;
		</div>
		<div>
			<Switch>
				<Route path="/" exact={true} component={Main} />
				<Route path="/login" render={()=><div>登录页面</div>}/>
				<Route  path="/center" render={()=>(
				loginType?<div>用户中心</div>:<Redirect  to ="/login"/>
				)}/>
			</Switch>
		</div>
	</BrowserRouter>
)
//渲染
ReactDOM.render(<App />, document.getElementById('root'));



