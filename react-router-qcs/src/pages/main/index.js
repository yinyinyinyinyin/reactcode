import React,{Component} from 'react';
//引入axios
import axios from 'axios';

//引入必买部分组件
import Bimai from '../../components/main/bimai.js';


import './index.scss';
class Main extends Component{
	constructor() {
	    super();
		this.state = {
			bimaiList:[],
			bimaiNav:[
				{"id":1,"group_id":28797,"name":"畅销尖货",activeType:true},
				{"id":2,"group_id":28798,"name":"春夏必备",activeType:false},
				{"id":3,"group_id":28799,"name":"低价精选",activeType:false},
				{"id":4,"group_id":28800,"name":"当季热卖",activeType:false}
			]
		}
	}
	componentDidMount(){
		this.getBiMaiData(28797);
	}
	//重新获取数据的函数
	getBiMaiData=(group_id)=>{
		console.log(group_id);
		let bimaiNav = this.state.bimaiNav;
		//需要修改nav的activeType
		for(var i = 0;i<bimaiNav.length;i++){
			bimaiNav[i].activeType = false;
			if(bimaiNav[i].group_id == group_id){
				bimaiNav[i].activeType = true;
			}
		}
		//将最新的bimaiNav保存到state
		this.setState({
			bimaiNav:bimaiNav
		})
		axios.get("item/ws/group_list?current_page=1&page_size=9&group_id="+group_id+"&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c")
		.then(res=>{
			console.log(res);
			this.setState({
				bimaiList:res.data.data.item_list
			})
		})
	}
	render(){
		const {bimaiList,bimaiNav} = this.state;
		return (
			<div className="main-con">
				<div className="main-img"><img alt="gonglue" src="https://image.watsons.com.cn//upload/d05b93ca.png"/></div>
				<div className="main-img"><img alt="美妆嘉年华" src="https://image.watsons.com.cn//upload/61fbcc3d.gif"/></div>
				<div className="main-img"><img alt="必买爆款" src="https://image.watsons.com.cn//upload/998a3a0c.jpg"/></div>
				<ul className="bimai-nav">
				{
					bimaiNav.map(item=>(<li key={item.id} 
					className={item.activeType?"active":""}  
					onClick={this.getBiMaiData.bind(this,item.group_id)}>
					{item.name}
					
					</li>))
				}
				</ul>
				{/*必买爆款*/}
				<Bimai  bimaiList={bimaiList}/>
			</div>
		) 
	}
}
export default Main;