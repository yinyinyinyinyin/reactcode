import React,{Component} from 'react';
//引入axios
import axios from 'axios';

import './index.scss';
class Main extends Component{
	constructor() {
	    super();
		this.state = {
			bimaiList:[]
		}
	}
	componentDidMount(){
		axios.get("item/ws/group_list?current_page=1&page_size=9&group_id=28797&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c")
		.then(res=>{
			console.log(res);
			this.setState({
				bimaiList:res.data.data.item_list
			})
		})
	}
	render(){
		const {bimaiList} = this.state;
		return (
			<div className="main-con">
				<div className="main-img"><img alt="gonglue" src="https://image.watsons.com.cn//upload/d05b93ca.png"/></div>
				<div className="main-img"><img alt="美妆嘉年华" src="https://image.watsons.com.cn//upload/61fbcc3d.gif"/></div>
				<div className="main-img"><img alt="必买爆款" src="https://image.watsons.com.cn//upload/998a3a0c.jpg"/></div>
				<ul className="bimai-con">
					{
						bimaiList.map(item=><li key={item.item_id}>
							<img src={item.over_image_url} alt={item.item_short_name}/>
							{item.item_short_name}
						</li>)
					}
				</ul>
			</div>
		) 
	}
}
export default Main;