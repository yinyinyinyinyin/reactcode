//路由
//引入插件
import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

//引入需要配置的页面的config
import {routerConfig} from './config';
//引入守卫的组件
import Auth from '../components/common/auth'; 
//引入页面
import Main from '../pages/main';
import Global from '../pages/global';
import Good from '../pages/good';
import Mask from '../pages/mask';
import Page404 from '../pages/page404';
import List from '../pages/list';
import Item from '../pages/item';
//import Cart from '../pages/cart';
//import Center from '../pages/center';
import Login from '../pages/login';
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
				<Switch>
					<Route path="/"  exact={true} component={Main} />
					<Route path="/mask" component={Mask} />
					<Route path="/good" component={Good} />
					<Route path="/global" component={Global} />
					<Route path="/list" component={List} />
					<Route path="/item" component={Item} />
					<Route path="/login" component={Login}/>
					<Auth config={routerConfig} />
					<Route  component={Page404} />
				</Switch>
			</div>
		</div>
	</BrowserRouter>
 )
 //输出
export default App;