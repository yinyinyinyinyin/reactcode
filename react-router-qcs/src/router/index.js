//路由
//引入插件
import React from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
//引入页面
import Main from '../pages/main';
import Global from '../pages/global';
import Good from '../pages/good';
import Mask from '../pages/mask';

//引入 头部组件
import Header from '../components/common/header';
 //写路由表
 const App =()=>(
	<BrowserRouter>
		<div>
			<div>
				<Header />
			</div>
			<div className="qcs-content">
				<Route path="/"  exact={true} component={Main} />
				<Route path="/mask" component={Mask} />
				<Route path="/good" component={Good} />
				<Route path="/global" component={Global} />
			</div>
		</div>
	</BrowserRouter>
 )
 //输出
export default App;