//路由
import React from 'react';
import {Link,Route} from 'react-router-dom';
//引入页面
import Main from '../pages/main';
import Mask from '../pages/mask';
import Good from '../pages/good';
import Global from '../pages/global';

//定义路由表
const App = ()=>(
<div>
	<div>
		<Link to="/">今日推荐</Link>
		<Link to="/mask">面膜中心</Link>
		<Link to="/good">潮流好物</Link>
		<Link to="/global">购全球</Link>
	</div>
	<div>
		<Route path="/" exact={true} component={Main} />
		<Route path="/mask" component={Mask} />
		<Route path="/good" component={Good} />
		<Route path="/global" component={Global} />
	</div>
</div>
)

export default App;