//候鸟的item页面
import React from 'react';
import axios from 'axios';
class HouniaoItem extends React.Component{
	constructor() {
	    super();
		this.state={
			item:{}
		}
	}
	componentDidMount(){
		axios.get('http://www.51houniao.com/product/product/getProductDetails/'+this.props.match.params.product_id).then(res=>{
			console.log(res);
			this.setState({
				item:res.data
			})
		})
	}
	render(){
		const {match} = this.props;
		const {item} = this.state;
		return <div>候鸟内容页
		接收从列表页传过来的参数:{match.params.product_id},
		{
			item.product_base_info != undefined ?<img src={this.state.item.product_base_info.pro_pic_url} />:''
		}
		{/*<img src={this.state.item.product_base_info.pro_pic_url} />*/}
		
		</div>
	}
}
export default HouniaoItem;