//主页
import React,{Component} from 'react';
class Main extends Component{
	render(){
		return (
			<div>
				<h3>计数器</h3>
				<button 
				onClick={this.props.onIncrement}
				
				>++</button><br/>
				<button >--</button>
				<div>计数器中的数据 :  {this.props.numValue}</div>
				
			</div>
		)
	}
}

export default  Main;