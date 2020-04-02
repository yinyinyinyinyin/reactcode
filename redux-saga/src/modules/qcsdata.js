//获取数据的纯函数
const qcsdata = (state={},action)=>{
	switch (action.type) {
		case 'SWIPER_DATA':
			return Object.assign({},state,{swiperList:action.swiperList});
		case 'SWIPER_CHAJIAN_DATA':
			return Object.assign({},state,{swiperChajianList:action.swiperChajianList});
		default:
			return state;
	}
}
export default qcsdata;