import React from 'react';
import { Layout,  Menu, Icon } from 'antd';

import './public.css';

const {Sider } = Layout;
const SubMenu = Menu.SubMenu;



const Nav = (props)=>{
	const {collapsed,onCollapse,shows}=props;
	return(
		
			 <Sider
	          collapsible
	          collapsed={collapsed}
	          onCollapse={onCollapse}
	         
	        >
	          <div className="logo" />
	          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"  onClick={(e)=>shows(e)}>
	           <SubMenu
	              key="sub1"
	              title={<span><Icon type="user" /><span>学习react</span></span>}
	            >
		            <Menu.Item key="1" >
		            	财务管理
		            </Menu.Item>
		            <Menu.Item key="2">
		            	初步学习react-redux
		            </Menu.Item>
	            </SubMenu>
	            <SubMenu
	              key="sub2"
	              title={<span><Icon type="user" /><span>学习react2</span></span>}
	            >
	              <Menu.Item key="3">
	              	数据列表和分页
	              </Menu.Item>
	              <Menu.Item key="4">
	              	全选和反选
	              </Menu.Item>
	              <Menu.Item key="5">
	              	123
	              </Menu.Item>
	            </SubMenu>
	            <SubMenu
	              key="sub3"
	              title={<span><Icon type="team" /><span>Team</span></span>}
	            >
	              <Menu.Item key="6">Team 1</Menu.Item>
	              <Menu.Item key="8">Team 2</Menu.Item>
	            </SubMenu>
	            <Menu.Item key="9">
	              <Icon type="file" />
	              <span>File</span>
	            </Menu.Item>
	          </Menu>
	        </Sider>
	)
}
export default Nav;