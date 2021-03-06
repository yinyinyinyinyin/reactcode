##1.创建项目
e:
cd www
create-react-app web21-redux-qcs

##2.安装依赖
npm install --save redux react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux-thunk redux-logger
npm install --save react-router-dom axios http-proxy-middleware@0.20.0 react-flexible swiper@3.4.2 antd reset-css
npm install --save-dev scss scss-loader node-sass

或者
cnpm install --save redux react-redux@5.1.1 react-router-dom@4.3.1 react-router-redux@5.0.0-alpha.8 redux-thunk redux-logger
cnpm install --save react-router-dom axios http-proxy-middleware@0.20.0 react-flexible swiper@3.4.2 antd reset-css
cnpm install --save-dev scss scss-loader node-sass


## 3.创建redux的路由及redux的状态管理器
	-- 3.1 创建了4个页面
src/pages/main/index.js	
```
import React,{Component} from 'react';
class Main extends Component{
	render(){
		return (
			<div>首页</div>
		)
	}
}

export default Main;
```
src/pages/good/index.js	
```
import React,{Component} from 'react';
class Good extends Component{
	render(){
		return (
			<div>潮流好物</div>
		)
	}
}

export default Good;
```
src/pages/global/index.js	
```
import React,{Component} from 'react';
class Global extends Component{
	render(){
		return (
			<div>购全球</div>
		)
	}
}

export default Global;
```
src/pages/mask/index.js	
```
import React,{Component} from 'react';
class Mask extends Component{
	render(){
		return (
			<div>面膜中心</div>
		)
	}
}

export default Mask;
```

	--3.2创建路由文件 src/router/index.js
```
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
```
--3.3 修改 src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import store,{history} from './store';

import './index.css';
import App from './router';
import * as serviceWorker from './serviceWorker';

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
	--3.4 创建 src/store.js
```
//创建仓库
import {createStore,applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createBrowserHistory} from 'history';
//引入纯函数
import rootReducer from './modules';

//输出history 
export const history = createBrowserHistory();
export default createStore(rootReducer,applyMiddleware(routerMiddleware(history),thunk,logger));
	```
	--3.5 创建 src/modules/index.js
```
import {combineReducers}  from 'redux';
import {routerReducer} from 'react-router-redux';
export default combineReducers({
	routerReducer
})
	```
##4.创建头部组件

	--4.1 创建头部组件
	src/components/common/header.js
```
import React,{Component} from 'react';
//引入路由包
//withRouter 是react路由封装好的高阶组件
import {NavLink,withRouter,Link} from 'react-router-dom';
//引入蚂蚁金服的ui
import {Row,Col,Input} from 'antd';
import { UserOutlined,ShoppingCartOutlined,SearchOutlined} from '@ant-design/icons';
//引入css
import './header.scss';
//没有配置在路由里面的组件,它的props属性是没有 location/history/match
class Header extends Component{
	render(){
		console.log(this.props);
		let {pathname} = this.props.location;
		return (
			<div>{
			pathname==='/' || pathname === '/mask' || pathname === '/good' || pathname === '/global'?
				<div className="qcs-header">
					<Row className="qcs-h-search">
						<Col span={4}>
							<UserOutlined className="header-font"/>
						</Col>
						<Col span={16}>
							 <Input size="middle" className="header-input" placeholder="保湿面膜0.1元" prefix={<SearchOutlined />} />
						</Col>
						<Col span={4}>
							<ShoppingCartOutlined className="header-font"/>
						</Col>
					</Row>
					<nav className="qcs-h-nav">
						<ul>
							<li><NavLink to="/" exact={true} activeClassName="active">今日推荐</NavLink></li>
							<li><NavLink to="/mask">面膜中心</NavLink></li>
							<li><NavLink to="/good">潮流好物</NavLink></li>
							<li><NavLink to="/global">购全球</NavLink></li>
						</ul>
					</nav>
				</div>
				:""
			}
			</div>		
		)
	}
}
export default withRouter(Header);
	```
	
	src/components/common/header.scss
```
.qcs-header{
	position: fixed;
	top:0;
	left:0;
	right:0;
	height:100px;
	background: #fff;
	z-index:9;
	.qcs-h-search{
		height:50px;
		line-height: 50px;
		text-align:center;
		border-bottom:1px solid #ccc;
		.header-font{font-size:20px;}
		.header-input{border-radius: 20px;}
	}
	.qcs-h-nav{
		height:50px; 
		line-height:50px;
		ul{
			display: flex;
			justify-content: space-around;
			flex-wrap: nowrap;
			li{
				a{color:#000; font-size:16px;display: inline-block; height:45px;}
				a.active{
					fontsize:16px;
					color:#ff6692;
					border-bottom:3px solid #ff6692;
				}
			}
		}
	}
}
	```
	--4.2 修改 src/index.js ,添加相应的样式
```
import 'reset-css';
import 'antd/dist/antd.min.css';
import 'react-flexible';
	```
	
	
	
	--4.3 修改 src/router/index.js
```
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
	```
	--4.4 需要修改src/index.css
```
.app-con{margin-top:100px;}
	```
## 5. 获取数据，在页面渲染	
	--5.1 配置 跨域
	cnpm install --save http-proxy-middleware@0.20.0
	修改 根目录下面的 package.json文件
```
  "proxy": "https://h5.watsons.com.cn/",
	```
	注意：添加后重启项目
	
	
	--5.2 创建常量文件src/contact.js
```
//轮播的常量
export const FETCH_SWIPER_DATA = 'FETCH_SWIPER_DATA';
	```
	--5.3.0 创建 获取数据的子树 src/modules/qcsdata.js
```
//引入常量
import {FETCH_SWIPER_DATA} from '../contact';

//纯函数
//Object.assign() 对state对象进行合并
const qcsdata = (state={},action) =>{
	console.log("纯函数运行了");
	switch (action.type){
		case FETCH_SWIPER_DATA://获取轮播数据
			return Object.assign({},state,{swiperList:action.swiperList});
		default :
			return state;
	}
}

export default qcsdata;
	```
	
	--5.3.1 修改 src/modules/index.js
```
import {combineReducers}  from 'redux';
import {routerReducer} from 'react-router-redux';

//引入数据的子树
import qcsdata from './qcsdata';
export default combineReducers({
	routerReducer,
	qcsdata
})
	```
	
	--5.4 创建动作 src/actions/index.js
```
//获取数据的动作
import axios from 'axios';

//引入常量
import {FETCH_SWIPER_DATA} from '../contact';

//获取轮播数据的动作
export function fetchSwiperList(){
	console.log("获取轮播数据的动作运行了");
	return (dispatch)=>{
		return axios.get("aladdin/get_batch_data?codes=[%22%E4%B8%B4%E6%97%B6%22,%22chajian%22,%22newhome_10icon_one_img2%22,%22newhome_10icon_one_img1%22,%22new_Home_4navs_180105_1%22,%22Home_seckill%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_SWIPER_DATA,
				swiperList:res.data.data.chajian.datas
			})
		});
	}
}
	```
	
	--5.5 创建轮播组件 src/components/main/mainswiper.js
```
import React,{Component} from 'react';

//引入语法检查的组件
import PropTypes from 'prop-types';

//轮播 3.4.2版本的引入
import Swiper from 'swiper/dist/js/swiper.min.js';
import 'swiper/dist/css/swiper.min.css';
//引入css样式
import './mainswiper.scss';
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
	
	 src/components/main/mainswiper.scss
```
.swiper-container{
	.swiper-wrapper{
		.swiper-slide{
			img{width:100%;}
		}
	}
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
	
	
	--5.6 修改 主页的文件 src/pages/main/index.js
```
import React,{Component} from 'react';
//引入动作
import {fetchSwiperList} from '../../actions';
//将ui组件转容器组件
import {connect} from 'react-redux';
//引入 轮播插件
import  MainSwiper from '../../components/main/mainswiper';
class Main extends Component{
	//钩子函数中调用store动作
	componentDidMount(){
		console.log('钩子函数运行了');
		this.props.dispatch(fetchSwiperList());
	}
	render(){
		return (
			<div>
			
			{/*轮播*/}
			<MainSwiper lunboList={this.props.swiperList}/>
			</div>
		)
	}
}

//将 state中的值和 props中的值进行映射
const mapStateToProps = (state) =>{
	const swiperList = state.qcsdata.swiperList ||[];
	return {swiperList}
}

export default connect(mapStateToProps)(Main);
	```
	
## 6.热卖推荐
	--6.1 在常量文件中添加相应的常量src/contact.js
```
//热卖推荐常量
export const FETCH_REMAI_DATA = "FETCH_REMAI_DATA";
	```
	
	--6.2 在src/modules/qcsdata.js中修改代码
```
//引入常量
import {FETCH_SWIPER_DATA,FETCH_REMAI_DATA} from '../contact';
//纯函数
const qcsdata = (state={},action)=>{
	switch (action.type) {
		case FETCH_SWIPER_DATA://轮播
			return Object.assign({},state,{swiperList:action.swiperList}) ;
		case FETCH_REMAI_DATA://热卖
				return Object.assign({},state,{remaiList:action.remaiList}) ;
		default:
			return state;
	}
}
export default qcsdata;
```
	--6.3 修改 src/actions/index.js
```
//引入常量
import {FETCH_SWIPER_DATA,FETCH_REMAI_DATA} from '../contact';

//获取必卖的数据动作
export function fetchRemaiList(){
	return dispatch=>{
		return axios.get("item/ws/group_list?current_page=1&page_size=9&group_id=28797&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_REMAI_DATA,
				remaiList:res.data.data.item_list
			})
			
		})
	}
} 
	```
	--6.4 添加 热卖的组件 src/components/main/bimai.js
```
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Bimai extends Component{
	render(){
		let {bimaiList} = this.props;
		return (
			<ul className="bimai-con">
				{
					bimaiList.map(item=><li key={item.item_id} >
					<Link to={{pathname:'/item',state:item}}>
						<img src={item.over_image_url} alt={item.item_short_name}/>
						{item.item_short_name}
					</Link>	
					</li>)
				}
			</ul>
		)
		
	}
}

export default Bimai;
```
	
	
	--6.5 修改 主页代码 src/pages/main/index.js
```
import React ,{Component} from 'react';
//将 ui组件转容器组件
import  {connect} from 'react-redux';
//引入动作
import {fetchSwiperList,fetchRemaiList} from '../../actions/index.js';
//引入 swiper组件
import MainSwiper from '../../components/main/mainswiper';
import Bimai from '../../components/main/bimai';
import './index.scss';
class Main extends Component{
	componentDidMount(){
		//调用store中的获取轮播数据动作
		this.props.dispatch(fetchSwiperList());
		//调用store中的获取热卖数据动作
		this.props.dispatch(fetchRemaiList());
	}
	render(){
		return(
			<div className="main-con"> 
			<MainSwiper lunboList = {this.props.swiperList} />
			<Bimai bimaiList={this.props.remaiList}/>
			</div>
		)
	}
}
const mapStateToProps = (state) =>{
	const swiperList = state.qcsdata.swiperList ||[];
	const remaiList = state.qcsdata.remaiList ||[];
	return {swiperList,remaiList}
}
export default connect(mapStateToProps)(Main);
	```
	
##7.今日秒杀流程
	--7.1 src/contact.js 添加相应的常量
```
//秒杀常量
export const FETCH_MIAOSHA_DATA = "FETCH_MIAOSHA_DATA";
	```
	7.2 修改 src/modules/qcsdata.js
```
//引入常量
import {FETCH_SWIPER_DATA,FETCH_REMAI_DATA,FETCH_MIAOSHA_DATA} from '../contact';
//纯函数
const qcsdata = (state={},action)=>{
	switch (action.type) {
		case FETCH_SWIPER_DATA://轮播
			return Object.assign({},state,{swiperList:action.swiperList}) ;
		case FETCH_REMAI_DATA://热卖
			return Object.assign({},state,{remaiList:action.remaiList}) ;
		case FETCH_MIAOSHA_DATA://秒杀
			return Object.assign({},state,{miaoshaList:action.miaoshaList,
			miaoshaNowTime:action.miaoshaNowTime,
			miaoshaEndTime:action.miaoshaEndTime
			}) ;
		default:
			return state;
	}
}
export default qcsdata;
	```
	
	--7.3 修改 src/actions/index.js
```
//引入常量
import {FETCH_SWIPER_DATA,FETCH_REMAI_DATA,FETCH_MIAOSHA_DATA} from '../contact';
//获取秒杀的数据动作
export function fetchMiaoshaList(){
	return dispatch=>{
		return axios.get("activity/specials/info?count=8&code=Home_flashSale__Top_Img&stock_code=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_MIAOSHA_DATA,
				miaoshaList:res.data.data.specials_item_v_o_s,
				miaoshaNowTime:res.data.data.now,
				miaoshaEndTime:res.data.data.specials_time_ranges[0].end
			})
		})
	}
} 
	```
	--7.4 添加组件
src/components/main/jinrimiaosha.js
```
import React,{Component} from 'react';
import './jinrimiaosha.scss';
class JinRiMiaoSha extends Component{
	constructor() {
	    super();
		this.state = {
			daojishi:['00','00','00'] //表示倒计时的时分秒
		}
	}
	componentDidMount(){
		let miaoshaTime = this.props.endTime-this.props.nowTime;//秒杀的时间戳
		//console.log(miaoshaTime);
		setInterval(()=>{
			miaoshaTime -= 1000;
			//将事件戳转日期时间
			let time = this.formatTime(new Date(miaoshaTime));
			//console.log(time);
			//将time 的时间值保存到 state
			this.setState({
				daojishi:time
			})
		},1000);
		
	}
	//只要看到:Can't perform a React state update on an unmounted component 就添加下面的代码
	//将未完成的setState停止掉
	componentWillUnmount = () => {
	    this.setState = (state,callback)=>{
	      return;
	    };
	}
	 
	//将事件戳转日期时间
	formatTime=(date)=>{
		let time = date/1000;
		const s = Math.floor(time%60);
		const m = Math.floor(time/60%60);
		const h = Math.floor(time/60/60%24);
		return [h,m,s].map(this.addZero);
	}
	//时间如果是一位数,请在前面加零
	addZero =(n)=>{
		if(n>9){
			return n;
		}else{
			return "0"+n;
		}
	}
	
	render(){
		//console.log(this.props.nowTime);
		//console.log(this.props.endTime);
		let {miaoshaList} = this.props;
		let {daojishi} = this.state;
		return (
			<div className="jinri-con">
				<div className="miaosha">
					今日秒杀
					<span className="djs">
						<span>{daojishi[0]}</span>:
						<span>{daojishi[1]}</span>:
						<span>{daojishi[2]}</span>
					</span>
					<span className="more">更多好货> </span>
				</div>
				<div className="miaosha1">
				{
					miaoshaList.map((item,index)=>{
						return (
							<div className="neir" key={index}>
								<div className="biqiang">必抢</div>
								<img src={item.image_url} alt={item.item_id}/>
								<div className="name">{item.item_short_name}</div>
								<div>money</div>
							</div>
						)
					})
				}	
				</div>
			</div>
		)
	}
}

export default JinRiMiaoSha;
```

src/components/main/jinrimiaosha.scss
```
.jinri-con{
	width: 100%;
	background: url(https://image.watsons.com.cn//upload/b875a675.png);
	height:5.493333rem;
	background-size: cover;
	
	.miaosha{
		height:1.333333rem;
		line-height: 1.333333rem;
		font-size:16px;
		font-weight: bold;
		padding-left:0.533333rem;
		.djs{
			padding-left:0.533333rem;
			display: inline-block;
			margin-bottom:0.186666rem;
			span{
				font-size:12px;
				background: #000;
				color:#fff;
				padding:0.053333rem;
			}
		}
		.more{padding-left:2.4rem;}
	}
	.miaosha1{
		width:9.173333rem;
		height:3.733333rem;
		margin:0.266666rem 0.4rem;
		
		display:flex;
		overflow-x: scroll;
		border-radius: 5px;
		.neir{
			margin-left:0.133333rem;
			margin-right:0.133333rem;
			width: 2.533333rem;
			bordeR:1px solid #ededed;
			background: #fff;
			border-radius: 5px;
			position: relative;
			img{
				height:2.48rem;
				width:2.48rem;
				border-radius: 5px;
			}
			.name{
				border-top:1px solid #ededed;
				padding:5px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.biqiang{
				position: absolute;
				    top: 2rem;
				    left: 0px;
				    background: orangered;
				    color: #fff;
				    padding: 3px;
				    border-radius: 2px;
			}
		}
	}
	/*chrome浏览器下去除横向滚动条*/
	.miaosha1::-webkit-scrollbar{
		display:none;
	}
}
//样式需要将 px转rem
	```
	
	--7.5 修改 src/pages/main/index.js
```
//引入动作
import {fetchSwiperList,fetchRemaiList,fetchMiaoshaList} from '../../actions/index.js';

import JinRiMiaoSha from '../../components/main/jinrimiaosha';

	//调用store中的获取秒杀数据动作
		this.props.dispatch(fetchMiaoshaList());
	```
在render中添加
```
const {miaoshaList,miaoshaNowTime,miaoshaEndTime,swiperList,remaiList} = this.props;
```
在return中的<div className="main-con"> 标签中添加
```
{/*今日秒杀*/}
				{
					miaoshaEndTime === '' && miaoshaNowTime===''?"":<JinRiMiaoSha endTime={miaoshaEndTime} nowTime={miaoshaNowTime} miaoshaList={miaoshaList} />
				}
	```
	
	
	
	
	
	
	

	
 	