//首页
import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class HouniaoMain extends React.Component{
	constructor() {
	    super();
		this.state = {
			list:[]
		}
	}
	componentDidMount(){
		axios.post('http://www.51houniao.com/product/product/getProductRecommendUser',{
			desc: false,
			orderBy: "top",
			pageNow: 1,
			pageSize: 20,
			seller_user_id: "4bc4027c645343f09a964b5c2e9f875b"
		}).then(res=>{
			console.log(res);
			this.setState({
				list:res.data
			})
		})
	}
	render(){
		return <div><h3>候鸟首页</h3>
			<ul>
				{this.state.list.map(item=><li key={item.productId}>
				<Link to={"/houniaoitem/"+item.productId}  >
				<img src={item.proPicUrl} />
				{item.proTitle}
				</Link>
				</li>)}
			</ul>
		
		</div>
	}
}
export default HouniaoMain;