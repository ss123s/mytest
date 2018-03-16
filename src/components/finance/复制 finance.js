import React ,{PureComponent}  from 'react';
//import PorpTypes from 'prop-types';
import {Table,Input ,Button,DatePicker } from 'antd';
import moment from 'moment';
//import * as FinaceApi from '../tool/api';
import {stringify} from 'qs';
import * as  Apis from '../../server/finace';

class Fina extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			dataa:[],
			dates:'',
			titles:'',
			moneys:null,
			plays:false,
			ids:null,
		}
		this.columns =[
			{
				title:"Id",
				dataIndex:"id",	
			},
			{
				title:"Date",
				dataIndex:"dates",
			},
			{
				title:"Title",
				dataIndex:"title",
			},
			{
				title:"Amount",
				dataIndex:"moeny",
			},{
				title:"play",
				dataIndex:"play",
				width: '20%',
			}]
	}
	componentDidMount(){
		Apis.getFinace().then((res)=>{
			this.setState({dataa:res.data})
		})
	}
	/*增加功能*/
	
	/*增加功能*/
	
	plusData=(data)=>{
		Apis.plusData(
			this.state.dates,
			this.state.title,
			this.state.moeny
		).then((res)=>{
			this.setState({
				dates:'',
				titles:'',
				moneys:null,
				dataa:[
				...this.state.dataa,
				res.data
				]
			})
			this.props.showData(res.data);			
		})
	}
	
//	hid=()=>{
//		console.log(this.refs.da);
//	}
//	cooki=(e)=>{	
//		this.setState({
//			plays:!this.state.plays,
//			ids:e.target.id
//		})
//		if(this.state.plays){
//				console.log(e.value);
//		}
//	
//	}
//	onCh=(e)=>{
//		console.log(e);
//		console.log(e.target.value);
//	}
	render(){		
		//渲染数据
	const	datas = this.state.dataa.map((item,index)=>{
			let datesa =moment(item.dates * 1000).format('YYYY-MM-DD HH:mm:ss');
			let tost =  {
				key:index.toString(),
				id:item.id,
				dates:datesa,
				title:item.title,
				moeny:item.moeny,
				play:<div>
					<Button type="primay" onClick={this.cooki} id={item.id}>修改</Button>
					<Button type="primay"  id={item.id}>删除</Button>
				</div>
			}
			let tosta =  {
				key:index.toString(),
				id:item.id,
				dates:datesa,
				title:<Input ref="titles"  defaultValue={item.title}  onChange={(e)=>this.onCh(e)}/>,
				moeny:<Input ref="moenys"  defaultValue={item.moeny.toString()}  onChange={(e)=>this.onCh(e)} />,
				play:<div>
								<Button type="primay"  id={item.id}>保存</Button>
								<Button type="primay" onClick={this.cooki} id={item.id}>取消</Button>
						</div>
			}
			if(this.state.ids===item.id && this.state.plays){
				return tosta;
			}else{
				return tost;
			}
		});
		return (
			<div>
				<div  style={{margin:"15px 0"}} onChange={this.ShowInput}>
					<label>
						<DatePicker
							style={{width:"180px"}}
							format="YYYY-MM-DD HH:mm:ss"
							onChange={this.onDateShow}
						/>
					</label>
					<Input 
						name="titles"
						value={this.state.titles}
						style={{width:"120px",margin:"0 15px"}}
						placeholder="title"  />
					<Input 
						name="moneys"
						value={this.state.moneys}
						style={{width:"120px",margin:"0 15px"}} 
						placeholder="money" />
					<Button
						disabled={!this.voids()}
					onClick={this.plusData} type="primay">我是按妞</Button>
				</div>
				<Table
				bordered 
				dataSource={datas}
				columns={this.columns} 
				/>
			</div>
		)
	}
}
export default Fina;
//Fina.porpTypes={
//	
//}
