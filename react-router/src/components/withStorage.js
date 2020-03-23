//高阶组件 又叫做 HOC	,是在react中重用逻辑的高阶技术.具体说,高阶组件的参数是一个组件,返回值是一个
//新组件,高阶组件本身是一个函数
//相当于 vue中的mixin
import  React ,{Component} from 'react';

const withStorage = WrappedComponent =>{
	return class extends Component{
		componentWillMount(){
			let data = localStorage.getItem('data');
			this.setState({
				data:data
			})
		}
		render(){
			return <WrappedComponent data={this.state.data} {...this.props} />
		}
	}
}

export default withStorage;
