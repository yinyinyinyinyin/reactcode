//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';

//1.引入路由相关包
import {BrowserRouter,Link,Route} from 'react-router-dom';

//2.引入页面
import Main from './pages/main';
import About from './pages/about';

//3.配置路由表
//exact={true}  表示匹配是完全匹配
const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="/">首页</Link>
			<Link to="/about">关于我们</Link>
		</div>
		<div>
			<Route path="/" exact={true} component={Main} />
			<Route path="/about" component={About}/>
		</div>
	</BrowserRouter>
)


//渲染
ReactDOM.render(<App />, document.getElementById('root'));



