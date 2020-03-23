//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route,Switch,Prompt} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';

//Prompt  当页面将要离开时,做挽留处理,当点击其他页面时,会出现弹框,点击确定会离开该页面,点击取消会留在该页面
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
				<Route path="/login" render={()=><div>登录页面
				<Prompt when={true} message={'您确定要离开这个页面么?'}/>
				
				</div>}/>
				<Route  path="/center" render={()=>(<div>用户中心</div>)}/>
			</Switch>
		</div>
	</BrowserRouter>
)
//渲染
ReactDOM.render(<App />, document.getElementById('root'));



