import React ,{Component} from 'react';
//ui组件转容器组件
import {connect} from 'react-redux';
//引入轮播的组件
import MainSwiper from '../../components/main/mainswiper';
class About extends Component{
	componentDidMount(){
		this.props.getSwiperList();
		this.props.getSwiperChajianList();
	}
	render(){
		return (
			<div>
			<button >调用数据</button>
			
			<h3>轮播图</h3>
			<MainSwiper  lunboList={this.props.swiperList} />
			<h3>轮播图2</h3>
			
			<MainSwiper  lunboList={this.props.swiperChajianList} />
			</div>
		)
	}
}
const mapStateToProps = state=>{
	const swiperList = state.qcsdata.swiperList || [];
	const swiperChajianList = state.qcsdata.swiperChajianList || [];
	return {swiperList,swiperChajianList}
}
//发送动作
const mapDispatchToProps = dispatch=>{
	return {
		getSwiperList:()=>{
			dispatch({
				type:'SWIPER_DATA'
			})
		},
		getSwiperChajianList:()=>{
			dispatch({
				type:'SWIPER_CHAJIAN_DATA'
			})
		},
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(About);