## 1.react 与 vue的区别
	-- react 一般采用 jsx语法
	-- react 单项数据流 ，没有如同 vue的v-model ，一般需要使用 state来处理状态值
	-- react 对组件的操作比vue强，类组件、函数式组件(无状态组件)、高阶组件、...
	-- react 是一个一系列的移动端解决方案，react  react-router  redux  react-native
	-- react 更稳定、插件更多
	-- vue学习成本更低、代码更简洁、学习资源基本都是中文的
	
	--相同点：
	--1.都使用了虚拟dom
	--2.组件间传参都是单向的
	--3.侧重于 ui渲染的框架
	--4.都使用组件的开发方式
	--5.创建项目的时候都使用了构建工具
	vue  vue-cli
	react create-react-app
	
## 什么时候使用vue  ，什么时候使用react
	--如果您想要一个轻量级，更快速，更现代的UI库来制作一流的SPA（单页面应用程序），您应该选择Vue.js. 对于习惯使用HTML的开发人员来说，这是有利的
	--由于成熟的用户群，React适用于大规模应用程序和移动应用程序。很明显，如果您想使用JavaScript构建移动应用程序，React Native绝对是您的选择。
	
##在以下场景中，Vue比反应更好：
最新文档和更简单的语法。
更小，更快，更灵活。
丰富的HTML模板，易于开发。

## React比Vue.js好：
需要构建移动应用程序。
专业和出色的社区支持，以解决任何问题。
需要构建大型应用程序。
轻量级，易于版本迁移。	

## 2. react 类组件、函数式组件(无状态组件)区别
	-- 函数式组件没有state状态，没有this，性能更好，没有钩子函数。没有继承 Component，不需要实例化，直接调用
	-- 类组件 有 this，有state有钩子函数，继承了上一级的component
	
## 3.jsx语法优势特点
	-- jsx中的html只允许有一个根节点，单标签需要闭合
	-- jsx在解析时，有优化处理，性能更佳
	-- html、js、css混写的，html是使用js来生成
	-- class在使用时需要使用 className
	-- jsx语法中html部分值允许 使用 三目运算符而不可以使用 if else语句
	-- 使用 map进行循环处理
	--在jsx语法中使用 单大括号啦调用变量或表达式
	
## 标签和组件的区别
	--1.创建标签和创建组件不一样，标签直接写；组件： React.createClass来创建
	--2.名字不一样，组件名必须首字母大写
	--3.使用不一样，组件使用时，需要在组件名的外面加一层<组件名称/>
	
## 组件间传参
	--1.父传子  使用props接收
	--2.子传父  在调用子组件时父组件的对应函数作为参数进行传递，在子组件中 使用  this.props.函数名的
	形式来使用，直接在子组件里调用了父组件的函数就可以了
	
## state和props的区别
	--1.state 一般用于 用户需要更改的状态，props的值一般是不变的
	--2.props一般是用于 组件间传参的
	--3.state  使用setState来更改 状态值
	
## 事件及事件传参
	--1.事件的调用  如：  onClick = {this.changeType}
	--2.事件传参   如：onClick = {(ev)=>this.changeType(参数,ev)}
	onClick = {this.changeType.bind(this,参数)}
	
## 初始值设置可以写成  
	react15.***  getInitialState   ,getDefaultProps
	
	使用率更高
	react16.***  
	constructor(){
		super();
		this.state = {
			type:true
		}
	}
	
## 	生命周期钩子函数
	-- vue :beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforedestroy、destroyed、
	--react :
	--render :渲染
	--componentWillMount： 挂载前  只加载一次
	--componentDidMount: 挂在后  获取异步数据  ，调用 ajax   setInterval  setTimeout  只加载一次
	--componenetWillReceivePeops  :当父组件的props发生变化时触发的钩子函数
	--shouldComponentUpdate:做性能优化的，return true  就会触发 componentWillUpdate  render componentDidUpdate
	return false  就不会触发 componentWillUpdate  render componentDidUpdate
	--componentWillUpdate 更新前  多次加载
	--componentDidUpdate 更新后 多次加载
	--componentWillUnmount 卸载前 一般可以在这个钩子函数中 撞断ajax请求，对绑定的事件解绑 或者做一些回收处理
	
	--V17.0之后的版本删除的钩子函数	componentWillMount ，componentWillReceiveProps ，componentWillUpdate	在 v16.3以上版本新增的钩子函数	getDerivedStateFromProps：组件初始（重新渲染）加载时，获取当前的props与state的值（在此钩子函数中不能使用this），再此比较返回最新值对象（这个返回简单点说就相当于setState），
	注意添加 条件不满足时 return null；
	
	getSnapshotBeforeUpdate：会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的	https://blog.csdn.net/smile_ycm/article/details/87714287
	
## 	表单的双向绑定
	-- value={this.state.value}  onChange={this.changeType}	-- changeType=(ev)=>{
		this.setState({
			value:ev.target.value
		})
	}
	
## 什么是受控组件、什么是非受控组件
	受控组件，意思表单中输入的数据不能直接显示在 input框中，必须将value值绑定给 state，再使用
	onChange事件更改state的值的情况
	非受控组件，不受state控制，键盘输入的内容可以直接接受到，非受控组件一般获取数据需要使用 refs的
	方式
	对于非受控组件设置初始值的时候需要使用defaultValue
	
## fragment 解决组件返回多个元素的情况

## context  可以避免props逐级传递
	
## 	
	
	
	
	
	
	
	
	
	
	
