//saga的工具方法
import {put,take,fork,delay,takeEvery,all} from 'redux-saga/effects';
import axios from 'axios';
//延时两秒加一
function * incrementAsync (){
	yield delay(2000);
	yield put({type:'INCREMENT'});
} 

//延时两秒减一
function * decrementAsync (){
	yield delay(2000);
	yield put({type:'DECREMENT'});
} 

//获取轮播数据
function * getSwiperList(){
	try{
		const res = yield axios.get('aladdin/get_batch_data?codes=["sylunbo","pingou_B","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&province_code=&city_code=&version=&app_channel=wap&plat=wap&access_token=&device_id=4c16be50-74ab-11ea-bfb5-2b83c8eef134');
		//将获取的数据发送给纯函数
		yield put({
			type:'SWIPER_DATA',
			swiperList:res.data.data.sylunbo.datas
		})	
	}catch(e){
		console.log("获取数据失败",e.message);
	}
}

//获取轮播插件数据
function * getSwiperChajianList(){
	try{
		const res = yield axios.get('aladdin/get_batch_data?codes=["临时","chajian","newhome_10icon_one_img2","newhome_10icon_one_img1","new_Home_4navs_180105_1","Home_seckill"]&version=&app_channel=wap&plat=wap&access_token=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c');
		//将获取的数据发送给纯函数
		yield put({
			type:'SWIPER_CHAJIAN_DATA',
			swiperChajianList:res.data.data.chajian.datas
		})	
	}catch(e){
		console.log("获取数据失败",e.message);
	}
}


//检测是否有以下动作调用
export function * watchCountData(){
	yield takeEvery('INCREMENT_ASYNC',incrementAsync);//查看相关容器组件是否发送了该动作
	yield takeEvery('DECREMENT_ASYNC',decrementAsync);//查看相关容器组件是否发送了该动作
}

//检测是否存在获取数据的动作
export function * watchGetData(){
	yield takeEvery('FETCH_SWIPER_DATA',getSwiperList);
	yield takeEvery('FETCH_SWIPER_CHAJIAN_DATA',getSwiperChajianList);
}

export default function * rootSaga(){
	yield all([
		watchCountData(),
		watchGetData()
	])
}