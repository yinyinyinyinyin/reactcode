//获取storage的页面
import React from 'react';
//引入高阶组件
import withStorage from '../../components/withStorage.js';

class Get1 extends React.Component{
	//获取缓存 信息 的这部分功能代码重复了,需要封装,所以需要高阶组件
	// componentWillMount(){
	// 	let data = localStorage.getItem('data');
	// 	this.setState({
	// 		data:data
	// 	})
	// }
	
	render(){
		console.log(this.props);
		return <div>
			<h3>获取缓存信息1</h3>
			<div>{this.props.data}</div>
			
		</div>
	}
}
//调用
export default withStorage(Get1);