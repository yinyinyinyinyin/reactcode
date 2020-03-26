import React from 'react';
import ReactDOM from 'react-dom';

import App from './router';


//引入蚂蚁金服
import "antd/dist/antd.min.css";

//重置浏览器的默认样式
import "reset-css";

//rem
import "react-flexible";
import './index.css';



import * as serviceWorker from './serviceWorker';
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
