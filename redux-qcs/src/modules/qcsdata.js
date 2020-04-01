//qcs获取后台数据的子树

//引入常量
import {FETCH_SWIPER_DATA} from '../contact';

//纯函数
//Object.assign() 对state对象进行合并
const qcsdata = (state={},action) =>{
	console.log("纯函数运行了");
	switch (action.type){
		case FETCH_SWIPER_DATA://获取轮播数据
			return Object.assign({},state,{swiperList:action.swiperList});
		default :
			return state;
	}
}

export default qcsdata;


