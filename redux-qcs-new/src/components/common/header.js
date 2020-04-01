import React,{Component} from 'react';
//引入路由包
//withRouter 是react路由封装好的高阶组件
import {NavLink,withRouter,Link} from 'react-router-dom';
//引入蚂蚁金服的ui
import {Row,Col,Input} from 'antd';
import { UserOutlined,ShoppingCartOutlined,SearchOutlined} from '@ant-design/icons';
//引入css
import './header.scss';
//没有配置在路由里面的组件,它的props属性是没有 location/history/match
class Header extends Component{
	render(){
		console.log(this.props);
		let {pathname} = this.props.location;
		return (
			<div>{
			pathname==='/' || pathname === '/mask' || pathname === '/good' || pathname === '/global'?
				<div className="qcs-header">
					<Row className="qcs-h-search">
						<Col span={4}>
							<UserOutlined className="header-font"/>
						</Col>
						<Col span={16}>
							 <Input size="middle" className="header-input" placeholder="保湿面膜0.1元" prefix={<SearchOutlined />} />
						</Col>
						<Col span={4}>
							<ShoppingCartOutlined className="header-font"/>
						</Col>
					</Row>
					<nav className="qcs-h-nav">
						<ul>
							<li><NavLink to="/" exact={true} activeClassName="active">今日推荐</NavLink></li>
							<li><NavLink to="/mask">面膜中心</NavLink></li>
							<li><NavLink to="/good">潮流好物</NavLink></li>
							<li><NavLink to="/global">购全球</NavLink></li>
						</ul>
					</nav>
				</div>
				:""
			}
			</div>		
		)
	}
}
export default withRouter(Header);