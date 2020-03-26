import React,{Component} from 'react';
import axios from 'axios';
import './index.scss';
class List extends Component{
	constructor() {
	    super();
		this.state={
			listArr:[],// 列表页的数组
			page:1,//当前页,默认为第一页
			end:false//false 还没到底,true 到底了
		}
	}
	componentDidMount(){
		axios.get("item/ws/group_list?current_page=1&page_size=24&group_id=28516&device_id=d667b580-6e63-11ea-bc08-f9000f2957ab").then(res=>{
			let listArr = res.data.data.item_list;
			//将数据保存到 state
			this.setState({
				listArr:listArr
			})
		})
		
		//触发滚动事件
		this.ListScroll();
	}
	
	ListScroll=()=>{
		window.onscroll=()=>{
			//滚动距离
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			//获取窗口的可视高度
			let windowHeight = document.documentElement.clientHeight;
			let scrollHeight = document.body.scrollHeight;
			//console.log("scrollTop:"+scrollTop);
			//console.log("windowHeight:"+windowHeight);
			//console.log("scrollHeight:"+scrollHeight);
			if(scrollHeight - scrollTop <= windowHeight){//触底了,需要加载下一页的数据
				//将当前页加一
				this.setState({
					page:this.state.page+1
				})
				//获取新数据
				this.moreData(this.state.page);
				
				
				
			}
		}	
	}
	//获取新数据的函数
	moreData=(page)=>{
		if(!this.state.end){//判断是否到底了
			//获取数据
			axios.get("https://h5.watsons.com.cn/item/ws/group_list?current_page="+page+"&page_size=24&group_id=28516&device_id=d667b580-6e63-11ea-bc08-f9000f2957ab").then(res=>{
				let dataArr = res.data.data.item_list;
				if(dataArr === undefined){//到底了
					console.log("到底了");
					this.setState({
						end:true
					})
				}else{
					//获取的新数据需要追加在第一页数据的后面
					let oldArr = this.state.listArr;
					let newArr = oldArr.concat(dataArr);
					console.log(newArr);
					// //将数据保存到 state
					this.setState({
						listArr:newArr
					})
				}
				
			})
		}
		
	}
	//返回首页的函数
	goHome=()=>{
		this.props.history.push('/');
	}
	//组件卸载时,将没有停止的setState全部停止
	componentWillUnmount = () => {
	    this.setState = (state,callback)=>{
	      return;
	    };
	}
	render(){
		let {listArr} = this.state; 
		return (
		<div className="list-con">
			<h3> <span onClick={this.goHome}>{"<"}</span> <span className="list-title">护肤</span></h3>
			<ul >
				{
					listArr.map((item,index)=>{
						return (
						<li key={index}>
						<img src={item.over_image_url} alt={item.item_short_name}/>
						{item.item_short_name}
						</li>
						)
					})
				}
			</ul>
			<div className="end" style={this.state.end?{"display":"block"}:{"display":"none"}}>已经到底了,请不要再拉了!</div>
		</div>
		)
	}
}
//到底时,需要 提示"已经到底了,请不要在拉了!"
//list页面是不需要 默认头部的
//首页的层级问题需要修改
//报红的bug需要修改
export default List;