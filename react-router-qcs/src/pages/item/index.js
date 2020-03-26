import React,{Component} from 'react';
import './index.scss';
class Item extends Component{
	render(){
		console.log(this.props.location);
		let item = this.props.location.state;
		return (
		<div className="item-con">
			<h3> <span onClick={this.goHome}>{"<"}</span> <span className="list-title">护肤</span></h3>
			<div>
				<img src={item.over_image_url} alt={item.item_short_name}/>
			</div>
		</div>)
	}
}
export default Item;