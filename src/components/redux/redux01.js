import React ,{PureComponent} from 'react';
import {Button,Input} from 'antd';
import {createStore} from 'redux';
import reducer from '../../reducers/conuter';

const store = createStore(reducer);

class ReduxOne extends PureComponent{
	
	constructor(props){
		super(props);
		this.state={
			numb:0
		}
	}
	 componentDidMount() {
        store.subscribe(() => this.setState({numb: store.getState()}));
    }
	onIncrement=()=>{
		store.dispatch({type:'INCREMENT'});
	}
	onMinus=()=>{
		store.dispatch({type:'MINUS'});
	}
	
	PlusIng=()=>{
		this.setState({
			numb:1
		})
	}
	render(){
		const values = store.getState();
		return(
			<div>
				<div>
					<Input width="120" defaultValue={values} value={values}/>
				</div>
				<div>			
					<Button onClick={this.onIncrement} type="primay">加</Button>
					<Button onClick={this.onMinus} type="default">减</Button>
				</div>
			</div>
		)
	}
}

export default ReduxOne;
