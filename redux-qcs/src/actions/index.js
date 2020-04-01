//获取数据的动作
import axios from 'axios';

//引入常量
import {FETCH_SWIPER_DATA} from '../contact';

//获取轮播数据的动作
export function fetchSwiperList(){
	console.log("获取轮播数据的动作运行了");
	return (dispatch)=>{
		return axios.get("aladdin/get_batch_data?codes=[%22%E4%B8%B4%E6%97%B6%22,%22chajian%22,%22newhome_10icon_one_img2%22,%22newhome_10icon_one_img1%22,%22new_Home_4navs_180105_1%22,%22Home_seckill%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=646b29c0-6d74-11ea-9bcd-c53527f03e1c").then(res=>{
			console.log(res);
			//将数据发送给纯函数
			dispatch({
				type:FETCH_SWIPER_DATA,
				swiperList:res.data.data.chajian.datas
			})
		});
	}
}