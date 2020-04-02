//获取数据的纯函数
const qcsdata = (state={},action)=>{
	switch (action.type){
		case 'SWIPER_DATA'://轮播数据
			return Object.assign({},state,{swiperList:action.swiperList});
		case 'SWIPER_CHAJIAN_DATA'://插件轮播数据
			return Object.assign({},state,{swiperChajianList:action.swiperChajianList});
		default:
			return state;
	}
}
export default qcsdata;