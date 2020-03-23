//获取storage的页面
import React from 'react';
import withStorage from '../../components/withStorage.js';

class Get2 extends React.Component{
	//获取缓存 信息
	// componentWillMount(){
	// 	let data = localStorage.getItem('data');
	// 	this.setState({
	// 		data:data
	// 	})		
	// }
	render(){
		return <div>
			<h3>获取缓存信息2</h3>
			<div>{this.props.data}</div>
		</div>
	}
}
export default withStorage(Get2);