import React ,{PureComponent}from 'react';
//import PropTypes from 'prop-types';
import { Layout ,Breadcrumb} from 'antd';

/*引入组件*/
import Headers from '../component/header';
import Footers from '../component/footer';
import Navs from '../component/nav';
import Finna from '../components/finance/finance';
import ReduxOne from '../components/redux/redux01';
/*引入组件*/
const { Header, Content, Footer, Sider } = Layout;

export default class Home extends PureComponent{
	constructor(props){
		super(props);
		this.state={
			collapsed:false,
			numbs:"1"
		}
	}
	onCollapse = (collapsed) => {
	    console.log(collapsed);
	    this.setState({ collapsed });
	  }
	shows=(e)=>{
		this.setState({numbs:e.key});
	}
	showData=(data)=>{
		console.log(data);
	}
	render(){
		const numbs = this.state.numbs;
		return(
			 <Layout style={{ minHeight: '100vh' }}>
			 		<Navs 
			 			Sider={Sider}
				 		collapsed={this.state.collapsed}
				 		onCollapse={this.onCollapse}
				 		shows={this.shows}
			 		/>
			 	  <Layout>
			 	 	<Headers Header={Header}/>
			 	  <Content style={{ margin: '0 16px' }}>
			        <Breadcrumb style={{ margin: '16px 0' }}>
			            <Breadcrumb.Item>User</Breadcrumb.Item>
			            <Breadcrumb.Item>Bill</Breadcrumb.Item>
			        </Breadcrumb>
					<div style={{ padding: 24, background: '#fff', minHeight:580 }}>
						{numbs==="1"?
						<Finna
						showData={this.showData}
						/>:
						<ReduxOne
						onIncrement={this.props.onIncrement}
							value={this.props.value}
						/>}
					    
					</div>
			     </Content>
			 	 	<Footers Footer={Footer}/>
			 	 </Layout>
			 </Layout>
		)
	}
	
}

//Home.propTypes={
//		
//};
//


