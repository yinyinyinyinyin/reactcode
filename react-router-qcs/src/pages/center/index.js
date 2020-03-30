import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Button} from 'antd';
import './index.scss';
 class Center extends Component{
	logout=()=>{
		localStorage['token'] = "";
		this.props.history.push("/");
	}
	render(){
		return <div className="center-con">
				<h3>用户中心页</h3>
				<Button type="primary" onClick={this.logout}>退出</Button>
			</div>
		
	}
}
export default Center ;