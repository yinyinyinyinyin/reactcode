//纯函数
//功能:接收旧的状态值和动作,返回新的状态值
let defaultState = 10;
export default (state=defaultState ,action)=>{	
	switch(action.type){
		case 'INCREMENT'://增加
			//console.log('纯函数:'+state);
			return state + 1;
		case 'DECREMENT'://减少
			return state -1;
		default :
			return state;
	}
}