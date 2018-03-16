import React   from 'react';
import { Table, Input, Popconfirm ,Button} from 'antd';
import {stringify} from 'qs';
import * as  Apis from '../../server/finace';
import Plus from './plus';

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    	data: [],
    	selectedRowKeys: [],
    	loading: false,
    }
    this.columns = [{
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    }, {
      title: '时间',
      dataIndex: 'dates',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'dates'),
    }, {
      title: '收入钱数',
      dataIndex: 'moeny',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'moeny'),
    }, {
      title: '收入方式',
      dataIndex: 'title',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'title'),
    },{
      title: 'operation',
      dataIndex: 'operation',
       width: '15%',
      render: (text, record) => {
        const { editable } = record;
       
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.id)} style={{margin:"0 10px"}}>保存</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : <span>
                <a onClick={() => this.edit(record.id)} style={{margin:"0 16px 0 0"}}>修改</a>
                 <Popconfirm title="Sure to cancel?" onConfirm={() => this.onDelete(record.id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            }
          </div>
        );
      },
    }];
    
  }
  /*生命周期列表*/
 	componentDidMount(){
 		Apis.getFinace().then((res)=>{
			this.setState({data:res.data})
		})
 	} 	
 	plusData=(data)=>{
		Apis.plusData(data).then((res)=>{
			this.setState({			
				data:[
				...this.state.data,
				res.data
				]
			})
			this.props.showData(res.data);			
		})
	}
 /*生命周 结束*/
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.id, column)}
      />
    );
  }
  handleChange(value, id, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => id === item.id)[0]; 
    if (target) {
      target[column] = value;
      this.setState({ data: newData });      
    }
  }
  onDelete = (id) => {
   	const newData = [...this.state.data];
    this.setState({ data: newData.filter(item => item.id !== id) });
    Apis.delData(id).then((res)=>{
    	console.log(res);
    })
  }
  onAllDelete = () => {
  	 let {selectedRowKeys} = this.state;
   	const newData = [...this.state.data];
// 	const ee = newData.filter(item =>item.id !== [...selectedRowKeys] )
// 		console.log(ee);
		this.setState({selectedRowKeys:[]});
    this.setState({ data: newData.filter((item,i) => item.id !== selectedRowKeys[i]) });
//  Apis.delData([...selectedRowKeys]).then((res)=>{
//  	console.log(res);
//  })
  }
  edit(id) {
    const newData = [...this.state.data];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(id) {
    const newData = [...this.state.data];
    const target = newData.filter(item => id === item.id)[0];
   
    if (target) {
      delete target.editable;
      this.setState({data: newData });
      Apis.upData(target.id,target).then((res)=>{
      	console.log(res);
      })
      
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(id) {
    const newData = [...this.state.data];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  
   onSelectChange = (selectedRowKeys) => {
//  console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
  	const data = this.state.data;
    this.cacheData = data.map(item => ({ ...item }));
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    
    
    
    
    
    
    return (<div>
    	<Plus plusData={this.plusData}/>
    	<Button type="primay" onClick={this.onAllDelete}>删除制定ID</Button>
    	<Table 
    	rowSelection={rowSelection}
    	    rowKey={record => record.id}
    	bordered dataSource={this.state.data} columns={this.columns} />
    </div>);
  }
}
/* rowKey={record => record.id}主键值*/
export default EditableTable;

