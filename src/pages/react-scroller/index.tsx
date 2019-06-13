import React, {
	Component
} from 'react';
import './index.css'
import Scroller from './react-scroller/index';

export default class ReactComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			top: 0,
			bottom: 0
		};
		
		this.refresh=this.refresh.bind(this);
		this.infinite=this.infinite.bind(this);
	}
	componentDidMount() {
		let {
			items
		} = this.state;

		for(let i = 1; i <= 20; i++) {
			items.push(i + ' - keep walking, be 2 with you.')
		}

		this.setState({
			items: items,
			top: 1,
			bottom: 20
		});
	}

	refresh(done) {
		setTimeout(() => {
			let start = this.state.top - 1;
			for(let i = start; i > start - 10; i--) {
				this.state.items.splice(0, 0, i + ' - keep walking, be 2 with you.');
			}
			this.setState({
				items:this.state.items,
				top: this.state.top - 10
			},()=>{
				done();
			});
		}, 1500);
	}

	infinite(done) {
		if(this.state.items.length>=70){
			done(true)
			return false;
		}  
		
		setTimeout(() => {
			let start = this.state.bottom + 1;
			for(let i = start; i < start + 10; i++) {
				this.state.items.push(i + ' - keep walking, be 2 with you.');
			}
			this.setState({
				items:this.state.items,
				bottom: this.state.bottom + 10
			},()=>{
				done();
			});
		}, 1500);
	}

	onItemClick(index, item) {
		console.log(index,item);
	}
    onScroll(e,val){
		console.log(e,val);
	}
	render() {
		return(
			<div>
				<Scroller
					onScroll={this.onScroll.bind(this)}
	                onInfinite={this.infinite.bind(this)}
	                onRefresh={this.refresh.bind(this)}>
	                
					{this.state.items.map((item, index) => (
						<div key={index} onClick={this.onItemClick.bind(this, index, item)} className="row">
							{item}
						</div>
					))}
				</Scroller>
			</div>
		);
	}
}