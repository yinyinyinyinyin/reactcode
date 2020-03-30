import React from 'react';
import {Link,Route} from 'react-router-dom';
//引入页面
import Main from './pages/main';
import About from './pages/about';
//定义路由表
const App = ()=>(
	<div>
		<div>
			<Link to="/">首页</Link>
			<Link to="/about">关于我们</Link>
		</div>
		<div>
			<Route path="/" exact={true} component={Main}/>
			<Route path="/about" component={About}/>
		</div>
	</div>
)
export default App;