import React ,{Component} from 'react';
//将 ui组件转容器组件
import  {connect} from 'react-redux';
//引入动作
import {fetchSwiperList,fetchRemaiList,fetchMiaoshaList} from '../../actions/index.js';
//引入 swiper组件
import MainSwiper from '../../components/main/mainswiper';
import Bimai from '../../components/main/bimai';
import JinRiMiaoSha from '../../components/main/jinrimiaosha';


import './index.scss';
class Main extends Component{
	constructor() {
	    super();
		this.state = {
			bimaiNav:[
				{"id":1,"group_id":28797,"name":"畅销尖货",activeType:true},
				{"id":2,"group_id":28798,"name":"春夏必备",activeType:false},
				{"id":3,"group_id":28799,"name":"低价精选",activeType:false},
				{"id":4,"group_id":28800,"name":"当季热卖",activeType:false}
			],
		}
	}
	componentDidMount(){
		//调用store中的获取轮播数据动作
		this.props.dispatch(fetchSwiperList());
		//调用store中的获取热卖数据动作
		this.props.dispatch(fetchRemaiList(28797));
		//调用store中的获取秒杀数据动作
		this.props.dispatch(fetchMiaoshaList());
		
	}
	//获取必买爆款的数据
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
		
		//调用 state中的数据
		//调用store中的获取热卖数据动作
		this.props.dispatch(fetchRemaiList(group_id));
	}
	render(){
		const {bimaiNav} = this.state;
		const {miaoshaList,miaoshaNowTime,miaoshaEndTime,swiperList,remaiList} = this.props;
		return(
			<div className="main-con"> 
				{/*今日秒杀*/}
				{
					miaoshaEndTime === '' && miaoshaNowTime===''?"":<JinRiMiaoSha endTime={miaoshaEndTime} nowTime={miaoshaNowTime} miaoshaList={miaoshaList} />
				}
				
				<MainSwiper lunboList = {swiperList} />
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
				<Bimai bimaiList={remaiList}/>
			
		
			
			</div>
		)
	}
}
const mapStateToProps = (state) =>{
	const swiperList = state.qcsdata.swiperList ||[];
	const remaiList = state.qcsdata.remaiList ||[];
	const miaoshaList = state.qcsdata.miaoshaList ||[];
	const miaoshaNowTime = state.qcsdata.miaoshaNowTime ||"";
	const miaoshaEndTime = state.qcsdata.miaoshaEndTime ||"";
	return {swiperList,remaiList,miaoshaList,miaoshaNowTime,miaoshaEndTime}
}
export default connect(mapStateToProps)(Main);