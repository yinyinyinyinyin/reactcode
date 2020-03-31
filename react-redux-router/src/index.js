import React from 'react';
import ReactDOM from 'react-dom';
//引入react和redux关联的库

//Provider 使用它包裹的组件都可以获取到store中的数据
import {Provider} from 'react-redux';

//引入redux的路由插件
import {ConnectedRouter} from 'react-router-redux';

//引入路由
import App from './router';

//引入store的仓库
import store ,{history} from './store';

//引入redux的调试工具
import DevTools from './containers/DevTools.js';


ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<App />
				<DevTools />
			</div>
		</ConnectedRouter>
	</Provider>
  ,
  document.getElementById('root')
);

