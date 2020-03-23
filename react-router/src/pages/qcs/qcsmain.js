//首页
import React from 'react';
import {Link,Route} from 'react-router-dom';
import Child1 from './child1';
import Child2 from './child2';
class QCSMain extends React.Component{
	render(){
		return <div>
		
		我是屈臣氏首页
		
		<Link to="/qcsmain/child1">child1</Link>
		<Link to="/qcsmain/child2">child2</Link>
		
		<Route  path="/qcsmain/child1" componet={Child1}/>
		<Route  path="/qcsmain/child2" componet={Child2}/>
		</div>
	}
}
export default QCSMain;