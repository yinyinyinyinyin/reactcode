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