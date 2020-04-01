//获取数据的动作
import axios from 'axios';
//引入常量
import {FETCH_SWIPER_DATA,FETCH_REMAI_DATA,FETCH_MIAOSHA_DATA} from '../contact';

//获取轮播图数据的动作
export function fetchSwiperList(){
	return dispatch=>{
		return axios.get("aladdin/get_batch_data?codes=[%22%E4%B8%B4%E6%97%B6%22,%22chajian%22,%22newhome_10icon_one_img2%22,%22newhome_10icon_one_img1%22,%22new_Home_4navs_180105_1%22,%22Home_seckill%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_SWIPER_DATA,
				swiperList:res.data.data.chajian.datas
			})
			
		})
	}
} 

//获取必卖的数据动作
export function fetchRemaiList(group_id){
	return dispatch=>{
		return axios.get("item/ws/group_list?current_page=1&page_size=9&group_id="+group_id+"&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_REMAI_DATA,
				remaiList:res.data.data.item_list
			})
		})
	}
} 


//获取秒杀的数据动作
export function fetchMiaoshaList(){
	return dispatch=>{
		return axios.get("activity/specials/info?count=8&code=Home_flashSale__Top_Img&stock_code=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_MIAOSHA_DATA,
				miaoshaList:res.data.data.specials_item_v_o_s,
				miaoshaNowTime:res.data.data.now,
				miaoshaEndTime:res.data.data.specials_time_ranges[0].end
			})
		})
	}
} 
