import React,{Component} from 'react';
import {HomeOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import {message,Badge} from 'antd';
import './index.scss';
class Item extends Component{
	constructor(){
		super();
		this.state = {
			countTotal : 0//购物车的总数量
		}
	}
	//回到首页
	goHome=()=>{
		this.props.history.push('/');
	}
	//跳转到购物车页
	goCart=()=>{
		this.props.history.push('/cart');
	}
	//添加购物车程序
	/*
	1.点击按钮后,将数据添加到 缓存;(调用后台接口)
	2.想要保存到购物车中的数据有:商品id/商品的名称/商品的价格/商品的图片/商品的数量
	3.某商品第一次添加购物车,新增操作;非第一次添加购物车时修改操作
	4.需要在购物车页面获取相应的缓存数据,进行渲染
	*/
	addCart=()=>{
		//1.去除缓存中的数据
		var myCart = JSON.parse(localStorage.getItem('cart'));
		var data = [];//保存想要往购物车中存的数据
		var itemObj = this.props.location.state;
		var type = true;
		if(myCart !== null && myCart.length){//有数据
			//如果有数据,需要修改数据
			myCart.map((item)=>{
				if(item.id === itemObj.item_id){//在购物车找到了该商品
					//数量加一
					item.num++;
					item.checkType = true;
					type = false;
				}
				data.push(item);
				return null;
			})
		}
		//新增数据
		if(type){
			data.push({
				id:itemObj.item_id,
				num:1,
				price:itemObj.min_price,
				image_url:itemObj.over_image_url,
				name:itemObj.item_short_name,
				checkType:true//商品添加购物车时,默认是选中状态
			})
		}
		//将数据保存到缓存,在缓存中需要将数据保存成字符串
		localStorage.setItem('cart',JSON.stringify(data)  );
		message.info('添加成功',1);
		
		
		//计算购物车中的总数量
		this.totalNum();
	}
	//计算购物车中的商品总数
	totalNum = ()=>{
		//获取缓存中的数据
		let arr = JSON.parse(localStorage.getItem('cart'));
		let total = 0;
		if(arr !== null && arr.length){//购物车中有商品
			arr.map(item=>{
				//计算了总数量
				total += item.num;
				return null;
			})
		}
		console.log(73,total);
		//将总数量添加到 state
		this.setState({
			countTotal:total
		})
		
	}
	componentDidMount(){
		//调用计算总数量的函数
		this.totalNum();
	}
	
	render(){
		console.log(this.props.location);
		let item = this.props.location.state;
		return (
		<div className="item-con">
			<h3> <span onClick={this.goHome}>{"<"}</span> <span className="list-title">护肤</span></h3>
			<div>
				<img src={item.over_image_url} alt={item.item_short_name}/>
			</div>
			<div className="btns">
				<div onClick={this.addCart}>加入购物车</div>
				<div>立即购买</div>
			</div>
			<div className="icon-btn">
				<HomeOutlined onClick={this.goHome} className="icon-home" />
				<Badge count={this.state.countTotal} className="icon-cart"><ShoppingCartOutlined onClick={this.goCart}/></Badge>
			</div>
		</div>)
	}
}
export default Item;

//当添加购物车时,购物车的小图标上有角标变化