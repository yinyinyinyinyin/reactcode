import React,{Component} from 'react';
import './index.scss';
import {Input,Button,message } from 'antd';
import axios from 'axios';
class Login extends Component{
	constructor(){
		super();
		this.state = {
			phone:'',
			smsCode:'',
			btnText:'发送验证码',
			disabled:false //true按钮置灰  false 按钮不置灰  
		};
	}
	//输入手机号时,将手机号的值保存到state
	changePhone = (ev)=>{
		//console.log(ev.target.value);
		this.setState({
			phone:ev.target.value
		});
	}
	//输入验证码时,将验证码的值保存到state
	changeSmsCode = (ev)=>{
		//console.log(ev.target.value);
		this.setState({
			smsCode:ev.target.value
		});
	}
	//发送验证码
	/*
	1.获取到手机号
	2.验证手机号的格式
	3.调用后台接口,发送验证码
	*/
	sendSmsCode=()=>{
		let phone = this.state.phone.trim();
		let reg = /\S/;//空白符验证
		let re = /^1\d{10}$/;
		
		if(phone === '' || !reg.test(phone)){
			message.error('请输入手机号',0.5);
		}else if(!re.test(phone)){
			message.error('手机号请输入正确的格式',0.5);
		}else{
			console.log('可以调用后台接口了');
			axios.get('http://127.0.0.1:7001/sms/addSms?phone='+phone).then(res=>{
				console.log(res);
				message.info('验证码已发送请注意查收',0.5);
				this.setState({
					disabled:true
				})
				//定时器
				let i= 60;
				let timer = setInterval(()=>{
					i--;
					this.setState({
						btnText:'重发('+i+'s)'
					})
					if(i<=0){
						this.setState({
							btnText:'发送验证码',
							disabled:false
						})
						//停止定时器
						clearInterval(timer);
					}
				},1000); 
			});
		}
	}
	/*
	登录操作
	1.首先获取到 手机号和验证码
	2.验证格式是否正确
	3.调用后台接口,进行注册或登录操作
	*/
	sendLogin = ()=>{
		console.log(this.state);
		//获取数据,验证
		let phone = this.state.phone.trim();
		let reg = /\S/;//空白符验证
		let re = /^1\d{10}$/;
		
		let sms = this.state.smsCode.trim();
		let re1 = /^\d{4}$/;
		
		
		if(phone === '' || !reg.test(phone)){
			message.error('请输入手机号',0.5);
		}else if(!re.test(phone)){
			message.error('手机号请输入正确的格式',0.5);
		}else if(sms === '' ||  !reg.test(sms)){
			message.error('请输入验证码',0.5);
		}else if(!re1.test(sms)){
			message.error('验证码请输入正确的格式',0.5);
		}else{
			var params = new URLSearchParams();
			params.append('phone',this.state.phone);
			params.append('smsCode',this.state.smsCode);
			
			//调用后台接口,获取登录成功的数据
			axios.post('http://127.0.0.1:7001/user/login',params).then(res=>{
				console.log(res);
				if(res.data.code === 1){//失败
					message.error(res.data.msg,1);
				}else{
					//将成功的信息保存到storage
					localStorage.setItem('token',res.data.data.token);
					//跳转页面
					this.props.history.push('/center');
				}
			});
		}
	}
	
	componentWillUnmount(){
		this.setState = (state,callback)=>{
			return;
		}
	}
	
	render(){
		let {btnText,disabled} = this.state;
		return (
		<div className = "login-con">
			<h3> <span onClick={this.goHome}>{"<"}</span> <span className="list-title">登录/注册</span></h3>
			<div className="login-img"><img src="https://image.watsons.com.cn//upload/46c5e4a3.png" alt="qcs" /></div>
			<div className="login-form">
				<Input type="text" className="phone" placeholder="请输入手机号" name="phone" 
				onInput={this.changePhone}  value={this.state.phone}/>
				<br/>
				<Input type="text" className="sms" placeholder="请输入验证码" name="smsCode"
				 onInput={this.changeSmsCode}/>
				<Button className="sms-btn" type="primary" 
				disabled={disabled}
				onClick={this.sendSmsCode}>{btnText}</Button>
				<br/>
				<Button type="primary" className="login-btn" onClick={this.sendLogin}  >登录/注册</Button>
			</div>
		</div>
		)
	}
}

export default Login ;