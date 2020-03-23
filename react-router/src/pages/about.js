//关于我们
//首页
import React from 'react';
//使用class创建的组件中,不需要传history/location/match这些参数,因为 this.props的属性中就有,可以直接使用
class About extends React.Component{
	render(){
		console.log(this);
		const {history,match} = this.props;
		return <div>关于我们
		<button onClick={()=>{history.push('/')}}>返回首页</button>
		传递的页面值是:{match.params.pageid}
		</div>
	}
}
export default About;