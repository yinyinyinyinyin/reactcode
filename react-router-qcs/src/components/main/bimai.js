import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Bimai extends Component{
	render(){
		let {bimaiList} = this.props;
		return (
			<ul className="bimai-con">
				{
					bimaiList.map(item=><li key={item.item_id} >
					<Link to={{pathname:'/item',state:item}}>
						<img src={item.over_image_url} alt={item.item_short_name}/>
						{item.item_short_name}
					</Link>	
					</li>)
				}
			</ul>
		)
		
	}
}

export default Bimai;