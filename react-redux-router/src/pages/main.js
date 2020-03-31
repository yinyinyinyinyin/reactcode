import React ,{Component} from 'react';
//将ui组件转容器组件
import {connect} from 'react-redux';
//绑定动作
import {bindActionCreators} from 'redux';

//引入动作
import {increment,decrement,incrementSync,decrementSync} from '../modules/jishuqi';

class Main extends Component{
	render(){
		return (
		<div>
			<h3>计数器</h3>
			<button onClick={this.props.increment}>++</button><br/>
			<button onClick={this.props.decrement}>--</button>
			<button onClick={this.props.incrementSync}>延时1秒加一</button>
			<button onClick={this.props.decrementSync}>延时1秒减一</button>
			num的值为:{this.props.count}
		</div>
		)
	}
}

//将 store中的状态值和props中的值进行映射,等同于vuex中的工具方法,相当于  get
const mapStateToProps = state =>({
	count:state.jishuqi.count	
})

//将我们的store中的dispatch 和 props中的事件进行映射  ,相当于 set
const mapDispatchToProps = dispatch=>bindActionCreators({
	increment,incrementSync,decrement,decrementSync
},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(Main);