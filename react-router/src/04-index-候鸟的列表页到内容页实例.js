//引入react包
import React from 'react';
//引入react-dom包
import ReactDOM from 'react-dom';
//引入路由相关包
import {BrowserRouter,Link,Route} from 'react-router-dom';
//1.引入页面
import Main from './pages/main';
import HouniaoMain from './pages/houniaomain';
import HouniaoItem from './pages/houniaoitem';
//引入css
import './index.css';
const App = ()=>(
	<BrowserRouter>
		<div>
			<Link to="/">首页</Link> &nbsp;
			<Link to="/houniaomain">候鸟首页</Link> &nbsp;
		</div>
		<div>
			<Route path="/" exact={true} component={Main} />
			<Route path="/houniaomain" component={HouniaoMain}/>
			<Route path="/houniaoitem/:product_id" component={HouniaoItem}/>
		</div>
	</BrowserRouter>
)

//渲染
ReactDOM.render(<App />, document.getElementById('root'));



