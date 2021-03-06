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