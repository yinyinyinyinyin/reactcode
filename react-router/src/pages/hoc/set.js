//设置storage的页面
import React from 'react';
class Set extends React.Component{
	setStorage = ()=>{
		localStorage.setItem('data','夏天来了,好热啊!');
	}
	render(){
		return <div>
			<h3>设置缓存信息</h3>
			<button onClick = {this.setStorage}>点击按钮设置缓存信息</button>
		</div>
	}
}
export default Set;