import React,{Component} from 'react';

//引入语法检查的组件
import PropTypes from 'prop-types';

//轮播 3.4.2版本的引入
import Swiper from 'swiper/dist/js/swiper.min.js';
import 'swiper/dist/css/swiper.min.css';
//引入css样式
import './mainswiper.scss';
class MainSwiper extends Component{
	componentDidMount(){
		new Swiper('.swiper-container',{
			loop:true,
			autoplay:1000,
			observer:true,//数据是异步的
			observeParents:true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
		})
	}
	render(){
		let {lunboList} = this.props;
		console.log(lunboList);
		return (
			<div className="swiper-container">
			    <div className="swiper-wrapper">
				{
					lunboList.map((item)=>(
						<div className="swiper-slide" key={item.id}>
							<img src={item.image_url} alt={item.id}/>
						</div>
					))
				}
			    </div>
				<div className="swiper-pagination"></div>
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
			</div>
		)
		
	}
}

//进行数据的格式检查,优势是:当父组件传过来的数据格式不正确时,会有红色提示
//array  传过来的是个数组
//isRequired 传过来ide值不允许是空
//https://www.jianshu.com/p/a73fb26c88b5
MainSwiper.propTypes = {
	lunboList:PropTypes.array.isRequired
}

export default MainSwiper;