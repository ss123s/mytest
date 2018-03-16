import React ,{PureComponent}  from 'react';
import {Table,Input ,Button,DatePicker } from 'antd';
import moment from 'moment';

class Plus extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			dates:'',
			title:'',
			moneys:null,
		}
	}
	ShowInput=(e)=>{
		let target = e.target;
		this.setState({
			[target.name]:target.value
		})
	}
	onDateShow=(date,dateString)=>{
		this.setState({
			dates:dateString
		})
	}
	voids=()=>{
		return this.state.dates && this.state.title && this.state.moneys ;
	}
	plusDatas=()=>{
		const datas={
			dates:this.state.dates,
			title:this.state.title,
			moeny:this.state.moneys,
		};
		console.log(datas);
				this.props.plusData(datas);
		this.setState({
				dates:'',
				title:'',
				moneys:null,
		})

	}
	render(){
		return(
			<div  style={{margin:"15px 0"}} onChange={this.ShowInput}>
						<label>
							<DatePicker
								style={{width:"180px"}}
								format="YYYY-MM-DD HH:mm:ss"
								onChange={this.onDateShow}
							/>
						</label>
						<Input 
							name="title"
							value={this.state.title}
							style={{width:"120px",margin:"0 15px"}}
							placeholder="title"  />
						<Input 
							name="moneys"
							value={this.state.moneys}
							style={{width:"120px",margin:"0 15px"}} 
							placeholder="money" />
						<Button
							disabled={!this.voids()}
						onClick={this.plusDatas} type="primay">我是按妞</Button>
					</div>
		)}
}
export default Plus;
