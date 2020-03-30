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

//redux 流程:
/*
1.在组件中用户触发一个动作,使用 dispatch 发送这个动作,被纯函数接收,
2.纯函数接收到旧的状态值和动作,返回一个新的状态值
3.subscribe监听到store中的state值发生变化,会触发render函数重新渲染页面

*/

