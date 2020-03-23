//首页
import React from 'react';
import {Link,Route} from 'react-router-dom';
import Child1 from './child1';
import Child2 from './child2';
import './default.css';

class QCSMain extends React.Component{
	render(){
		return <div>
		我是屈臣氏首页
		<Link to="/qcsmain/child1">child1</Link>
		<Link to="/qcsmain/child2">child2</Link>
		<div className="con">
			<Route  path="/qcsmain/child1" component={Child1}/>
			<Route  path="/qcsmain/child2" component={Child2}/>
		</div>
		</div>
	}
}
export default QCSMain;