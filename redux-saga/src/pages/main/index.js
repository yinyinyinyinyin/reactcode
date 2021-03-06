import React ,{Component} from 'react';
import {connect} from 'react-redux';

class Main extends Component{
	render(){
		return (
			<div>首页
			<h3>计数器</h3>
			<div>{this.props.count}</div>
			<button onClick={this.props.increment}>加一</button>
			<button onClick={this.props.decrement}>减一</button>
			<button onClick={this.props.incrementAsync}>延时加一</button>
			<button onClick={this.props.decrementAsync}>延时减一</button>
			</div>
		)
	}
}

const mapStateToProps = state=>({
	count:state.jishuqi.count
})

const mapDispatchToProps = dispatch=>{
	return {
		increment:()=>{
			dispatch({//增加
				type:'INCREMENT'
			})
		},
		decrement:()=>{
			dispatch({//减少
				type:'DECREMENT'
			})
		},
		incrementAsync:()=>{
			dispatch({//延时增加
				type:'INCREMENT_ASYNC'
			})
		},
		decrementAsync:()=>{
			dispatch({//延时减少
				type:'DECREMENT_ASYNC'
			})
		},
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);