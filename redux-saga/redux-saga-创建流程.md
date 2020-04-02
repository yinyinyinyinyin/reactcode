##1. 先安装依赖
cnpm install --save react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux redux-logger redux-saga axios http-proxy-middleware@0.20.0 swiper@3.4.2 
或
npm install --save react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux redux-logger redux-saga axios http-proxy-middleware@0.20.0 swiper@3.4.2

##2.创建页面
src/pages/main/index.js
```
import React ,{Component} from 'react';

class Main extends Component{
	render(){
		return (
			<div>首页</div>
		)
	}
}

export default Main;
```
src/pages/about/index.js
```
import React ,{Component} from 'react';

class About extends Component{
	render(){
		return (
			<div>关于我们</div>
		)
	}
}

export default About;
```

##3.创建路由 src/router/index.js
```
//写路由
import React from 'react';
//引入路由相关包
import {Link,Route} from 'react-router-dom';
//引入页面
import Main from '../pages/main';
import About from '../pages/about';
//定义路由表
const App = ()=>(
	<div>
		<div>
			<Link to="/">首页</Link>
			<Link to="/about">关于我们</Link>
		</div>
		<div>
			<Route path="/" exact={true} component={Main}/>
			<Route path="/about"  component={About}/>
		</div>
	</div>
)
//输出
export default App;
```

##4.创建了纯函数的模块 src/modules/index.js
```
import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';

//输出
export default combineReducers({
	routerReducer
})
```

## 5.修改src/index.js   特殊注意一下，因为使用了saga写法和原来不一样了
```
import React from 'react';
import ReactDOM from 'react-dom';
//添加 react-redux关联的包
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

//引入saga
import rootSaga from './saga';

import App from './router';
import * as serviceWorker from './serviceWorker';

//创建redux的仓库
import createStore,{history} from './store';
const store = createStore();
console.log(store);
store.runSaga(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

```

##6.新建 src/store.js
```
import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
//引入saga  
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
//引入纯函数
import  rootReducer from './modules';

export const history = createBrowserHistory();

//输出需要创建的仓库
export default function configStore(initialState){
	//调用saga的中间件
	const sagaMiddleware = createSagaMiddleware();
	return {...createStore(rootReducer,initialState,applyMiddleware(routerMiddleware(history),sagaMiddleware,logger)),
	runSaga:sagaMiddleware.run
	}
}
```


##7.增加 计数器的纯函数src/modules/jishuqi.js
```
const initState  = {count:25};

export default (state = initState,action )=>{
	switch(action.type){
		case 'INCREMENT':
			return {count:state.count+1};
		case 'DECREMENT':
			return {count:state.count-1};
		case 'INCREMENT_ASYNC'://延时加一
			return state;
		default:
			return state;
	}
}
```

##8.将添加的计数器纯函数的reducer添加到根节点
src/modules/index.js
```
import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';
//引入计数器的纯函数
import jishuqi from './jishuqi';

//输出
export default combineReducers({
	routerReducer,
	jishuqi
})
```

## 9.创建 异步操作的saga文件src/saga.js
```
import {put,call,take,fork,delay,takeEvery,all} from 'redux-saga/effects';
//延时两秒加一
function * incrementAsync(){
	yield delay(2000);
	yield put({type:'INCREMENT'});
}
/**
 * 监听对延时加一和延时减一的监听
 */
export function * watchCountAsync(){
	//延时加一
	yield takeEvery('INCREMENT_ASYNC',incrementAsync);
	//延时减一
	
}
export default function * rootSaga(){
	// while(true){
	// 	yield take('INCREMENT_ASYNC');//监听是否有延时加一的动作调用
	// 	yield fork(incrementAsync);//调用 延时两秒加一的函数
	// }
	yield all([
		watchCountAsync()
	])
}
```

##10.在首页上调用相关的操作  src/pages/main/index.js
```
import React ,{Component} from 'react';
//将ui组件转容器组件
import {connect} from 'react-redux';
class Main extends Component{
	render(){
		return (
			<div>
			<h3>计数器</h3>
			<div>计数器中的值是:{this.props.count}</div>,
			<button onClick={this.props.increment}>加一</button>
			<button onClick={this.props.incrementAsync}>延时加一</button>
			</div>
		)
	}
}
//将 redux中的state值和props的值进行映射
const mapStateToProps = state=>({
	count:state.jishuqi.count
})
const mapDispatchToProps = dispatch=>{
	return {
		increment:()=>{
			dispatch({
				type:'INCREMENT'
			})
		},
		incrementAsync:()=>{
			dispatch({
				type:'INCREMENT_ASYNC'
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
```


##11.添加减一和延时减一的功能

	--11.1 修改src/modules/jishuqi.js
```
//设置初始值
const initState  = {count:25};
export default (state = initState,action )=>{
	switch(action.type){
		case 'INCREMENT':
			return {count:state.count+1};
		case 'DECREMENT':
			return {count:state.count-1};
		case 'INCREMENT_ASYNC'://延时加一
			return state;
		case 'DECREMENT_ASYNC'://延时减一
				return state;
		default:
			return state;
	}
}
	```
	--11.2 修改 src/saga.js
```
//延时两秒减一的函数
function * decrementAsync(){
	yield delay(2000);
	yield put({type:'DECREMENT'});
}

export function * watchCountAsync(){
	//延时加一
	yield takeEvery('INCREMENT_ASYNC',incrementAsync);
	//延时减一
	yield takeEvery('DECREMENT_ASYNC',decrementAsync);
}
	```
	--11.3 修改src/pages/main/index.js
```
import React ,{Component} from 'react';
//将ui组件转容器组件
import {connect} from 'react-redux';
class Main extends Component{
	render(){
		return (
			<div>
			<h3>计数器</h3>
			<div>计数器中的值是:{this.props.count}</div>,
			<button onClick={this.props.increment}>加一</button>
			<button onClick={this.props.incrementAsync}>延时加一</button>
			<button onClick={this.props.decrement}>减一</button>
			<button onClick={this.props.decrementAsync}>延时减一</button>
			</div>
		)
	}
}
//将 redux中的state值和props的值进行映射
const mapStateToProps = state=>({
	count:state.jishuqi.count
})
const mapDispatchToProps = dispatch=>{
	return {
		increment:()=>{
			dispatch({
				type:'INCREMENT'
			})
		},
		incrementAsync:()=>{
			dispatch({
				type:'INCREMENT_ASYNC'
			})
		},
		decrement:()=>{
			dispatch({
				type:'DECREMENT'
			})
		},
		decrementAsync:()=>{
			dispatch({
				type:'DECREMENT_ASYNC'
			})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
	```
## 12. 使用saga的形式获取数据   ,获取的轮播图数据
	--12.0 安装轮播的插件
	cnpm install --save swiper@3.4.2
	或
	npm install --save swiper@3.4.2
	
	--12.1 配置跨域  package.json
```
 "proxy": "https://h5.watsons.com.cn/",
	```
	配置后需要重启项目
	
	
	--12.2 创建 src/modules/qcsdata.js
```
//获取数据的纯函数
const qcsdata = (state={},action)=>{
	switch (action.type){
		case 'SWIPER_DATA'://是否是轮播数据
			return Object.assign({},state,{swiperList:action.swiperList});
		default:
			return state;
	}
}
export default qcsdata;
	```
	--12.3 修改 src/modules/index.js
```
import {combineReducers} from 'redux';
//引入路由的状态树
import {routerReducer} from 'react-router-redux';
//引入计数器的纯函数
import jishuqi from './jishuqi';
//引入获取数据的纯函数
import qcsdata from './qcsdata';
//输出
export default combineReducers({
	routerReducer,
	jishuqi,
	qcsdata
})
	```
	--12.4 修改 saga代码 src/saga.js
```
//获取轮播数据
function * getSwiperList(){
	try{
		const res = yield axios.get('aladdin/get_batch_data?codes=["sylunbo","pingou_B","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&province_code=&city_code=&version=&app_channel=wap&plat=wap&access_token=&device_id=4c16be50-74ab-11ea-bfb5-2b83c8eef134');
		console.log(res);
		yield put({
			type:'SWIPER_DATA',
			swiperList:res.data.data.sylunbo.datas
		})
	}catch(e){
		console.log("请求失败,错误是:",e.message);
	}
}
//检测是否存在获取数据的动作
export function * watchGetData(){
	yield takeEvery('FETCH_SWIPER_DATA',getSwiperList);
}

export default function * rootSaga(){
	yield all([
		watchCountAsync(),
		watchGetData()
	])
}
	```
	--12.5 将轮播的组件拷贝 
	src/components/main/mainswiper.js
```
import React,{Component} from 'react';

//引入语法检查的组件
import PropTypes from 'prop-types';

//轮播 3.4.2版本的引入
import Swiper from 'swiper/dist/js/swiper.min.js';
import 'swiper/dist/css/swiper.min.css';
//引入css样式
import './mainswiper.css';
class MainSwiper extends Component{
	componentDidMount(){
		new Swiper('.swiper-container',{
			loop:true,
			autoplay:1000,
			observer:true,//数据是异步的
			observeParents:true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
		})
	}
	render(){
		let {lunboList} = this.props;
		console.log(lunboList);
		return (
			<div className="swiper-container">
			    <div className="swiper-wrapper">
				{
					lunboList.map((item)=>(
						<div className="swiper-slide" key={item.id}>
							<img src={item.image_url} alt={item.id}/>
						</div>
					))
				}
			    </div>
				<div className="swiper-pagination"></div>
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
			</div>
		)
		
	}
}

//进行数据的格式检查,优势是:当父组件传过来的数据格式不正确时,会有红色提示
//array  传过来的是个数组
//isRequired 传过来ide值不允许是空
//https://www.jianshu.com/p/a73fb26c88b5
MainSwiper.propTypes = {
	lunboList:PropTypes.array.isRequired
}

export default MainSwiper;
	```
	src/components/main/mainswiper.css
```
.swiper-container  .swiper-wrapper .swiper-slide img{
	width:100%;
}
 .swiper-button-next{
	background: rgba(0,0,0,0.5) url("https://image.watsons.com.cn//upload/efbab720.png")
	50% 50% no-repeat;
	width:17px;
}
 .swiper-button-prev{
	background: rgba(0,0,0,0.5) url("https://image.watsons.com.cn//upload/686b2613.png")
	50% 50% no-repeat;
	width:17px;
}
	```
	
	--12.6 在src/pages/about/index.js 里添加轮播的内容
```
import React ,{Component} from 'react';
//ui组件转容器组件
import {connect} from 'react-redux';
//引入轮播的组件
import MainSwiper from '../../components/main/mainswiper';
class About extends Component{
	componentDidMount(){
		this.props.getSwiperList();
	}
	render(){
		return (
			<div>
			<h3>轮播图</h3>
			<MainSwiper  lunboList={this.props.swiperList} />
			</div>
		)
	}
}
const mapStateToProps = state=>{
	const swiperList = state.qcsdata.swiperList || [];
	return {swiperList}
}
//发送动作
const mapDispatchToProps = dispatch=>{
	return {
		getSwiperList:()=>{
			dispatch({
				type:'SWIPER_DATA'
			})
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(About);
	```
	
##13 添加第二个轮播图
	--13.1 修改了 src/saga.js
```
//获取轮播插件数据
function * getSwiperChajianList(){
	try{
		const res = yield axios.get('aladdin/get_batch_data?codes=["临时","chajian","newhome_10icon_one_img2","newhome_10icon_one_img1","new_Home_4navs_180105_1","Home_seckill"]&version=&app_channel=wap&plat=wap&access_token=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c');
		//将获取的数据发送给纯函数
		yield put({
			type:'SWIPER_CHAJIAN_DATA',
			swiperChajianList:res.data.data.chajian.datas
		})	
	}catch(e){
		console.log("获取数据失败",e.message);
	}
}
//检测是否存在获取数据的动作
export function * watchGetData(){
	yield takeEvery('FETCH_SWIPER_DATA',getSwiperList);
	yield takeEvery('FETCH_SWIPER_CHAJIAN_DATA',getSwiperChajianList);
}
	```
	
	--13.2 修改 src/modules/qcsdata.js
```
//获取数据的纯函数
const qcsdata = (state={},action)=>{
	switch (action.type) {
		case 'SWIPER_DATA':
			return Object.assign({},state,{swiperList:action.swiperList});
		case 'SWIPER_CHAJIAN_DATA':
			return Object.assign({},state,{swiperChajianList:action.swiperChajianList});
		default:
			return state;
	}
}
export default qcsdata;
	```
	--13.3 修改 src/pages/about/index.js
```
import React ,{Component} from 'react';
import {connect} from 'react-redux';
//引入组件
import MainSwiper from '../../components/main/mainswiper';
class About extends Component{
	componentDidMount(){
		this.props.getSwiperList();
		this.props.getSwiperChajianList();
	}
	render(){
		const {swiperList} = this.props;
		return (
			<div>关于我们
				<h3>第一个轮播图</h3>	
				{
					swiperList === []?"":<MainSwiper lunboList={this.props.swiperList} />
				}	
				<h3>第二个轮播图</h3>
				{
					swiperList === []?"":<MainSwiper lunboList={this.props.swiperChajianList} />
				}	
			</div>
		)
	}
}

const mapStateToProps = state=>{
	const swiperList = state.qcsdata.swiperList || [];
	const swiperChajianList = state.qcsdata.swiperChajianList || [];
	return {swiperList,swiperChajianList}
}
const mapDispatchToProps = dispatch=>{
	return {
		getSwiperList:()=>{
			dispatch({
				type:'FETCH_SWIPER_DATA'
			})
		},
		getSwiperChajianList:()=>{
			dispatch({
				type:'FETCH_SWIPER_CHAJIAN_DATA'
			})
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(About);
	```