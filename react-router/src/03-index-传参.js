//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';
import About from './pages/about';
//引入css
import './index.css';

//2.配置路由表
//basename 网站的基础路径, 一个服务器只部署一个网站不需要写basename,如果一个服务器部署多个网站才需要
//getUserConfirmation: func  作用：导航到此页面前执行的函数，默认使用 window.confirm
//forceRefresh 强制刷新 为了兼容 ie低版本  当浏览器不支持 HTML5 的 history API 时强制刷新页面
//exact: bool如果为 true，path 为 '/one' 的路由将不能匹配 '/one/two'，反之，亦然。

/*
props的属性有三个 :
history   :   go返回上一页     push 跳转到***页
location : 
	--key标识每个不同时间点的同一个页面     
	--state 用于传参  传参可以是数组或对象
    --search 用于传参  必须传字符串,一般是查询时使用
keyLength: number作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，
每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）
match  :  params  做传参用的 字符串传参 
*/
/*传参:
1.params
	在创建路由时需要 在Route写 "/user/:userid(参数名)"    ,
	调用路由时需要在Link 写   to="user/68(参数值)"
	在页面接收参数时,需要写   match.params.userid(参数名)
2.search  
	调用路由时需要在Link 写  to={{pathname:'/search',search:'?name=react'}}
	在页面接收参数时,需要写   new URLSearchParams(location.search).get('name')
3.state
	调用路由时需要在Link 写  to={{pathname:'/state',state:{"username":"山海经"}}}
	在页面接收参数时,需要写   location.state.username

区别:params 和search都是只可以传 字符串或数值型数据
state可以传 数组或对象
params传参时写法是 Route中 写 路径名/:参数名,  Link里写 路径名/参数值
search  Link 写  to={{pathname:'/路径名',search:'?key=value'}} 


*/
/*
Link to属性有两种方式:一种是 字符串作为路径,还有一种是使用对象最为路径
replace={true}:对于有 该属性的路由,它的前一个路由,并没有保存到历史记录里,而是直接被替换掉
*/
const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="/">首页</Link> &nbsp;
			<Link to="/about/1001">关于我们</Link> &nbsp;
			<Link to="/render" replace={true}>render页面</Link> &nbsp;
			<Link to="/user/68">有参数的user页面</Link> &nbsp;
			<Link to={{pathname:'/search',search:'?name=react'}}>使用search传参</Link> &nbsp;
			<Link to={{pathname:'/state',state:{"username":"山海经"}}}>使用state传参</Link> &nbsp;
		</div>
		<div>
			<Route path="/" exact={true} component={Main} />
			<Route path="/about/:pageid" component={About}/>
			<Route  path="/render"  render={()=><div>render页面</div>}/>
			
			<Route  path="/user/:userid"  render={({match})=><div>有参数的user页面
			{console.log(match)}
			接收的参数是:{match.params.userid}
			</div>}/>
			
			<Route  path="/search"  render={({location})=><div>有参数的search页面
			{console.log(location)}
			查询的内容是:{new URLSearchParams(location.search).get('name')}
			</div>}/>
			
			<Route  path="/state"  render={({location})=><div>有参数的state页面
			{console.log(location)}
			接收的参数是:{location.state.username}
			</div>}/>
		</div>
	</BrowserRouter>
)

//渲染
ReactDOM.render(<App />, document.getElementById('root'));



