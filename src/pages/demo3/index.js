import React from 'react';
import ListView from './react-pullto'
import './index.css'

class Demo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			loading: false,
			end: false // 是否还没有更多
		}
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				list: this.getList()
			})
		}, 0)
	}

	getList() {
		let result = []
		for(let i = 0; i < 20; i++) {
			result.push({
				name: `item-${Date.now()}`,
				date: new Date().toLocaleString()
			})
		}
		return result
	}
	handlePullup(down) { //上拉
		if(this.state.list.length>=70){   //没有更多数据了
			down(true);
			return false;
		}
		setTimeout(() => { // 模拟ajax请求
			let list = [...this.state.list]
			list = list.concat(this.getList())
			this.setState({
				list: list
			},()=>{
				down();
			})
		}, 1500);
	}
	handlePulldown(down) { //下拉
		setTimeout(() => { // 模拟ajax请求
			let list = this.getList()
			list = list.concat(this.state.list)
			this.setState({
				loading: false,
				list: list
			},()=>{
				down();
			})
		}, 1500);
	}
	render() {
		return(
			<ListView
	            onInfinite={this.handlePullup.bind(this)}
	            onRefresh={this.handlePulldown.bind(this)}
                >
	            {this.state.list.map((item,index) => {
		            return (
		              <div key={index} className="lsit-con">
		                  <div className="lsit">{item.name}{item.data}</div>
		              </div>
		            )
		          })
	            }
          </ListView>

		);
	}
}

export default Demo;