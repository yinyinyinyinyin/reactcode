import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//引入axios
import axios from 'axios';


//引入获取数据的api
import  {lunboData} from '../../http/api.js';


//引入必买部分组件
import Bimai from '../../components/main/bimai.js';
import MainSwiper from '../../components/main/mainswiper.js';
import JinRiMiaoSha from '../../components/main/jinrimiaosha.js';
import './index.scss';
class Main extends Component{
	constructor() {
	    super();
		this.state = {
			bimaiList:[],
			bimaiNav:[
				{"id":1,"group_id":28797,"name":"畅销尖货",activeType:true},
				{"id":2,"group_id":28798,"name":"春夏必备",activeType:false},
				{"id":3,"group_id":28799,"name":"低价精选",activeType:false},
				{"id":4,"group_id":28800,"name":"当季热卖",activeType:false}
			],
			lunboList:[],//轮播
			miaoshaList:[],//秒杀列表
			nowTime:0,//现在的时间戳
			endTime:0//结束的事件戳
		}
	}
	componentDidMount(){
		this.getBiMaiData(28797);
		//获取轮播数据
		this.getLunboData();
		//获取秒杀数据
		this.getMiaoShaData();
	}
	//组件卸载时,将没有停止的setState全部停止
	componentWillUnmount = () => {
	    this.setState = (state,callback)=>{
	      return;
	    };
	}
	 
	
	//轮播数据
	getLunboData=()=>{
		lunboData().then(res=>{
			console.log(res);
				this.setState({
					lunboList:res.data.data.chajian.datas
				})
		})
	}
	//秒杀数据
	getMiaoShaData=()=>{
		axios.get("activity/specials/info?count=8&code=Home_flashSale__Top_Img&stock_code=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c")
		.then(res=>{
			console.log(res);
			this.setState({
				miaoshaList:res.data.data.specials_item_v_o_s,
				nowTime:res.data.data.now,
				endTime:res.data.data.specials_time_ranges[0].end
			})
		})
	}
	
	//重新获取数据的函数
	getBiMaiData=(group_id)=>{
		console.log(group_id);
		let bimaiNav = this.state.bimaiNav;
		//需要修改nav的activeType
		for(var i = 0;i<bimaiNav.length;i++){
			bimaiNav[i].activeType = false;
			if(bimaiNav[i].group_id === group_id){
				bimaiNav[i].activeType = true;
			}
		}
		//将最新的bimaiNav保存到state
		this.setState({
			bimaiNav:bimaiNav
		})
		axios.get("item/ws/group_list?current_page=1&page_size=9&group_id="+group_id+"&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c")
		.then(res=>{
			console.log(res);
			this.setState({
				bimaiList:res.data.data.item_list
			})
		})
	}
	render(){
		const {bimaiList,bimaiNav,lunboList,miaoshaList,nowTime,endTime} = this.state;
		return (
			<div className="main-con">
				<div className="main-img"><img alt="gonglue" src="https://image.watsons.com.cn//upload/d05b93ca.png"/></div>
				<div className="main-img"><img alt="美妆嘉年华" src="https://image.watsons.com.cn//upload/61fbcc3d.gif"/></div>
				{
					nowTime !==0 && endTime!==0?
					<JinRiMiaoSha miaoshaList={miaoshaList} nowTime={nowTime} endTime={endTime}/>:""	
				}
				<div className="main-img"><img alt="必买爆款" src="https://image.watsons.com.cn//upload/998a3a0c.jpg"/></div>
				<ul className="bimai-nav">
				{
					bimaiNav.map(item=>(<li key={item.id} 
					className={item.activeType?"active":""}  
					onClick={this.getBiMaiData.bind(this,item.group_id)}>
					{item.name}
					
					</li>))
				}
				</ul>
				{/*必买爆款*/}
				<Bimai  bimaiList={bimaiList}/>
				{/*轮播*/}
				<MainSwiper lunboList={lunboList}/>
				<Link to="/list">
				<img className="hufu" src="https://image.watsons.com.cn//upload/6b197213.jpg" alt="护肤会场"/>
				</Link>
			</div>
		) 
	}
}
export default Main;