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