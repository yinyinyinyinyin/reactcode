//获取数据的纯函数

//引入常量
import {FETCH_SWIPER_DATA,FETCH_REMAI_DATA} from '../contact';
//纯函数
const qcsdata = (state={},action)=>{
	switch (action.type) {
		case FETCH_SWIPER_DATA://轮播
			return Object.assign({},state,{swiperList:action.swiperList}) ;
		case FETCH_REMAI_DATA://热卖
				return Object.assign({},state,{remaiList:action.remaiList}) ;
		default:
			return state;
	}
}
export default qcsdata;