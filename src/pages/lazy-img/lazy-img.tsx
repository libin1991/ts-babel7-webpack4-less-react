/**
 * image lazyload
 */
import React, {Component} from 'react';

const ref = 'lazyload';
interface Props {
	src: string,
	alt:string,
	style?:object,
	className?:string,

}

interface State {
	src: string,   // 0 箭头  1 loading
	loaded: boolean
}
export default class LazyImg extends Component<Partial<Props>, Partial<State>> {

	constructor(props:any) {
		super(props);
		this.loadImg = this.loadImg.bind(this);
		this.state = {
			src: '',
			loaded: false
		}
	}

	loadImg() {
		if(!this.props.src) {
			return false;
		}
		let image = new Image()
		image.onload = () => {
			this.setState({
				src: this.props.src,
				loaded: true
			})
		}
		image.src = this.props.src;
	}

	componentDidMount() {
		const self:any = this;
		if('IntersectionObserver' in window) {
			var io = new IntersectionObserver(
				entries => {
					entries.forEach((i:any)=> {
						if(i.intersectionRatio >= 0.25) { //可见元素占视窗的25%触发
							i.target.src = self.props.src
						}
					});
				}, {
					threshold: [0, 0.25, 0.5, 0.75, 1], //会执行5次
				}
			);
			io.observe(self.refs[ref]);
		} else {

			if(self.refs[ref].getBoundingClientRect().top < window.innerHeight) {
				self.loadImg();
			}

			window.addEventListener('scroll', function() {
				if(self.state.loaded) return;
				if(self.refs[ref].getBoundingClientRect().top < window.innerHeight) {
					self.loadImg()
				}
			}, true);
		}
	}

	render() {
		var {
			src,
			...listprop
		} = this.props;

		return <img src={this.state.src} {...listprop} ref={ref} />
	}

}