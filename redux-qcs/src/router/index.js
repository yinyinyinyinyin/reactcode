//路由
import React from 'react';
import {Route} from 'react-router-dom';
//引入页面
import Main from '../pages/main';
import Mask from '../pages/mask';
import Good from '../pages/good';
import Global from '../pages/global';

//引入头部组件
import Header from '../components/common/header';

//定义路由表
const App = ()=>(
<div>
	<div>
		<Header />
	</div>
	<div className="app-con">
		<Route path="/" exact={true} component={Main} />
		<Route path="/mask" component={Mask} />
		<Route path="/good" component={Good} />
		<Route path="/global" component={Global} />
	</div>
</div>
)

export default App;