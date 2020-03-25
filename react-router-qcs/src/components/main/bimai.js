import React,{Component} from 'react';
class Bimai extends Component{
	render(){
		let {bimaiList} = this.props;
		return (
			<ul className="bimai-con">
				{
					bimaiList.map(item=><li key={item.item_id} >
						<img src={item.over_image_url} alt={item.item_short_name}/>
						{item.item_short_name}
					</li>)
				}
			</ul>
		)
		
	}
}

export default Bimai;