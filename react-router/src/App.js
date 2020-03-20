//引入react
import React from 'react';
//引入logo
import logo from './logo.svg';
//引入css
import './App.css';

//函数式组件  无状态组件
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
        我们终于要写react项目了
      </header>
    </div>
  );
}

//组件输出
export default App;
