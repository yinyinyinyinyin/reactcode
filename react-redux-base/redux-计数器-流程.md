##1. 安装插件  
npm install --save redux
 或
cnpm install --save redux

## 2.创建组件src/main.js

```
//主页
import React,{Component} from 'react';
class Main extends Component{
	render(){
		return (
			<div>
				<h3>计数器</h3>
				<button 
				onClick={this.props.onIncrement}
				
				>++</button><br/>
				<button>--</button>
				<div>计数器中的数据 :  {this.props.numValue}</div>
			</div>
		)
	}
}
export default  Main;
```

## 3.创建纯函数 src/reducer.js
```
let defaultState = 10;
export default (state=defaultState ,action)=>{	
	switch(action.type){
		case 'INCREMENT'://增加
			//console.log('纯函数:'+state);
			return state + 1;
		case 'DECREMENT'://减少
			return state -1;
		default :
			return state;
	}
}
```

## 4.修改 src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';

//引入主页
import  Main from './main.js';
//引入纯函数
import  reducer from './reducer';
//引入创建store的包
import {createStore} from 'redux';
//创建仓库
const store = createStore(reducer);
console.log(store);

//store.getState  获取store中的状态值
//store.dispatch({'type':'INCREMENT'}) 发送一个动作,被纯函数的action接收
let render = () => ReactDOM.render(
  <React.StrictMode>
    <Main numValue = {store.getState()} 
	onIncrement={()=>store.dispatch({'type':'INCREMENT'})}
	/>
  </React.StrictMode>,
  document.getElementById('root')
);

render();
//监听store里面的state的值是否发生改变,如果改变了重新渲染页面
store.subscribe(render);
```