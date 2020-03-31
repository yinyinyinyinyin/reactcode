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