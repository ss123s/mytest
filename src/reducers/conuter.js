
const  conuter= (state=0,action={})=>{
	switch(action.type){
		default:  return state;
		case 'INCREMENT':
		return state +1;
		case 'MINUS':
		return state -1;
	}
}

export default conuter;