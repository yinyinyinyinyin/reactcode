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
const getDefault = ()=>{
	console.log('路由进来前执行的函数');
}

/*
Route组件就是当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面,有三种方式
1. component 按照组件的形式渲染
2.render 直接写渲染内容
3.children 按子组件渲染,每页路由都会显示
*/

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
/*jsx语法中 想要写数字或布尔型都需要加{}   ,例如:  {4}  {true}*/
const App = ()=>(
	<BrowserRouter basename="/"  getUserConfirmation={getDefault()}  
	forceRefresh={false} keyLength={4}>
		<div>
			<Link to="/">首页</Link>
			<Link to="/about">关于我们</Link>
			<Link to="/render">render页面</Link>
		</div>
		<div>
			<Route path="/" exact={true} component={Main} />
			<Route path="/about" component={About}/>
			<Route  path="/render"  render={({history,location,match})=><div>
				{console.log(history,location,match)}
				render页面
				<button onClick={()=>{history.push('/')}}>返回首页</button>
				<button onClick={()=>{history.go(-1)}}>返回上一页</button>
			</div>
			
			}/>
			<Route path="/child" children={()=><div className="footer">我是页面的尾部</div>} />
		</div>
	</BrowserRouter>
)

//渲染
ReactDOM.render(<App />, document.getElementById('root'));



