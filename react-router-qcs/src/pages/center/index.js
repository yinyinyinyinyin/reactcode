import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {Button} from 'antd';
import './index.scss';
class Center extends Component{
	constructor() {
	    super();
		this.state = {
			tokenType:1//默认值1 表示成功
		}
	}
	//调用后台接口判断登录状态
	//token 叫做令牌,一般情况下是为了后台验证登录的状态,
	//登录成功时会给前台发送一个token,后面每次请求数据时请带着这个token,
	//如果token的验证和后台保存的一致,表示状态ok,就可以给前台提供数据了
	componentDidMount(){
		axios.get("http://127.0.0.1:7001/center",{
			headers:{
				'Authorization':localStorage['token']
			}
		}).then(res=>{
			console.log(res);
			if(res.data.code === 0){//登录成功的
				this.setState({
					tokenType:true
				})
			}else{//失败
				this.setState({
					tokenType:false
				})
			}
		});
	}
	logout=()=>{
		localStorage['token'] = "";
		this.props.history.push("/");
	}
	render(){
		const {tokenType} = this.state;	
		if(tokenType){//已经登录了
			return <div className="center-con">
			<h3>用户中心页</h3>
			<Button type="primary" onClick={this.logout}>退出</Button>
			</div>
		}else{//没有登录  ,跳转到登录页
			return <Redirect to = "/login" />
		}
	}
}
export default Center ;