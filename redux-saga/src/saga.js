//处理异步操作的saga的内容
//引入工具方法
import {put,call,take,fork,delay,takeEvery,all} from 'redux-saga/effects';
import axios  from 'axios';
/*
put:与redux中的dispatch相似,可以发出一个动作,且发出的动作都会被reducer接收
call :使用异步请求
take:监听action,返回值是监听到的action对象
fork :在非阻塞的调用中使用
delay :延时  ,1000,2000
takeEvery:语义相当于on,允许并发action
all:创建 effect的描述信息,用来命令中间件并行的运行多个effect,并且等待他们全部完成
*/

//延时两秒加一
function * incrementAsync(){
	yield delay(2000);
	yield put({type:'INCREMENT'});
}

//延时两秒减一的函数
function * decrementAsync(){
	yield delay(2000);
	yield put({type:'DECREMENT'});
}

//获取轮播数据
function * getSwiperList(){
	try{
		const res = yield axios.get('aladdin/get_batch_data?codes=["sylunbo","pingou_B","Home_AboveTopic_activity_170505_7","Home_TopicCase_170505_7","Home_CategaryNavs_170505_7"]&province_code=&city_code=&version=&app_channel=wap&plat=wap&access_token=&device_id=4c16be50-74ab-11ea-bfb5-2b83c8eef134');
		console.log(res);
		yield put({
			type:'SWIPER_DATA',
			swiperList:res.data.data.sylunbo.datas
		})
	}catch(e){
		console.log("请求失败,错误是:",e.message);
	}
}

//获取轮播数据
function * getSwiperChajianList(){
	try{
		const res = yield axios.get('aladdin/get_batch_data?codes=["临时","chajian","newhome_10icon_one_img2","newhome_10icon_one_img1","new_Home_4navs_180105_1","Home_seckill"]&version=&app_channel=wap&plat=wap&access_token=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c');
		console.log(res);
		yield put({
			type:'SWIPER_CHAJIAN_DATA',
			swiperChajianList:res.data.data.chajian.datas
		})
	}catch(e){
		console.log("请求失败,错误是:",e.message);
	}
}

/**
 * 监听对延时加一和延时减一的监听
 */
export function * watchCountAsync(){
	//延时加一
	yield takeEvery('INCREMENT_ASYNC',incrementAsync);
	//延时减一
	yield takeEvery('DECREMENT_ASYNC',decrementAsync);
}

export function * watchData(){
	//延时加一
	yield takeEvery('SWIPER_DATA',getSwiperList);
	//延时减一
	yield takeEvery('SWIPER_CHAJIAN_DATA',getSwiperChajianList);
}


export default function * rootSaga(){
	// while(true){
	// 	yield take('INCREMENT_ASYNC');//监听是否有延时加一的动作调用
	// 	yield fork(incrementAsync);//调用 延时两秒加一的函数
	// }
	yield take('SWIPER_CHAJIAN_DATA');
	yield fork(getSwiperChajianList);
	yield take('SWIPER_DATA');
	yield fork(getSwiperList);
	
	// yield all([
	// 	watchCountAsync(),
	// 	watchData()
	// ])
}