const initState = {count:15};

export default (state=initState,action)=>{
	switch (action.type) {
		case 'INCREMENT':
			return {count:state.count+1}
		case 'DECREMENT':
			return {count:state.count-1}
		case 'INCREMENT_ASYNC':
			return state;
		case 'DECREMENT_ASYNC':
			return state;
		default:
			return state;
	}
}