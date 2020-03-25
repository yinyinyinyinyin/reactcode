import React,{Component} from 'react';
import './jinrimiaosha.scss';
class JinRiMiaoSha extends Component{
	render(){
		console.log(this.props.miaoshaList);
		let {miaoshaList} = this.props;
		return (
			<div className="jinri-con">
				<div className="miaosha">
					今日秒杀
				</div>
				<div className="miaosha1">
				{
					miaoshaList.map((item,index)=>{
						return (
							<div className="neir" key={index}>
								<div className="biqiang">必抢</div>
								<img src={item.image_url} alt={item.item_id}/>
								<div className="name">{item.item_short_name}</div>
								<div>money</div>
							</div>
						)
					})
				}
					
				</div>
			</div>
		)
		
	}
}

export default JinRiMiaoSha;