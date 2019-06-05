import React from 'react';
import ListView from './list'
import './my.css'

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
		for(let i = 0; i < 30; i++) {
			result.push({
				name: `item-${Date.now()}`,
				date: new Date().toLocaleString()
			})
		}
		return result
	}
	handlePullup(e) { //上拉
		this.setState({
			loading: true
		}, () => {
			setTimeout(() => { // 模拟ajax请求
				let list = [...this.state.list]
				list = list.concat(this.getList())
				this.setState({
					loading: false,
					list: list,
					end: list.length >= 60
				})
			}, 1000)
		})
	}
	handlePulldown(e) { //下拉
		this.setState({
			loading: true
		}, () => {
			console.log("ok");
			setTimeout(() => { // 模拟ajax请求
				let list = this.getList()
				list = list.concat(this.state.list)
				this.setState({
					loading: false,
					list: list
				})
			}, 1000)
		})
	}
	render() {
		return(
			<ListView
	            style={{height:'100%',background:'#fff',position: 'absolute',width: '100%'}}
	            onPullUp={this.handlePullup.bind(this)}
	            onPullDown={this.handlePulldown.bind(this)}
	            loading={this.state.loading}
	            end={this.state.end}>
	            {this.state.list.map((item,index) => {
		            return (
		              <div key={index}>
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