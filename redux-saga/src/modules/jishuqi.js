//
//自加自减的纯函数

//设置初始值
const initState  = {count:25};

export default (state = initState,action )=>{
	switch(action.type){
		case 'INCREMENT':
			return {count:state.count+1};
		case 'DECREMENT':
			return {count:state.count-1};
		case 'INCREMENT_ASYNC'://延时加一
			return state;
		default:
			return state;
	}
}