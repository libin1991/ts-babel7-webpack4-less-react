import React from 'react'
import PropTypes from 'prop-types'
import arrow from "./img/arrow.svg"
import spinner from "./img/spinner.svg"
import "./index.css"

interface Props {
    pullDownText: string,
    refreshText: string,
    loadingText: string,
	endText: string
}
interface State {
    status: number ,   // 0 箭头  1 loading
	loadstate:number
}

export default class ListView extends React.Component<Partial<Props>, Partial<State>> {

	static defaultProps = {
		pullDownText: '下拉刷新',
		refreshText: '释放更新',
		loadingText: '数据加载...',

		endText: '没有更多数据了'
	}
	constructor(props) {
		super(props)

		this.state = {
			status: 0 ,   // 0 箭头  1 loading
			loadstate:0   // 0 loading  1 没有数据了
		}

		this.handleScroll = this.handleScroll.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);

		this.stopLoading = this.stopLoading.bind(this);
		this.hasData=this.hasData.bind(this);
	}

	componentDidMount() {
		this.$el = this.refs.$el;
		this.props.onInfinite && this.props.onInfinite(this.hasData);    //首次拉取数据
		
		let timer = null;
		var  beforeScrollTop = this.$el.scrollTop;
		this.props.onInfinite && this.$el.addEventListener('scroll', (e) => {
			
			var afterScrollTop = this.$el.scrollTop,
            var delta = afterScrollTop - beforeScrollTop;
            this.props.onScroll&&this.props.onScroll(e , delta > 0 ? "down" : "up" );
			beforeScrollTop = afterScrollTop;
			
			timer && clearTimeout(timer);
			timer = setTimeout(() => {
				this.handleScroll(e);
			}, 200);
		});

		if(this.props.onRefresh) {
			if('ontouchstart' in window) {
				this.$el.addEventListener('touchstart', this.handleTouchStart);
				this.$el.addEventListener('touchmove', this.handleTouchMove);
				this.$el.addEventListener('touchend', this.handleTouchEnd);
			} else {
				this.$el.addEventListener('mousedown', this.handleTouchStart);
				this.$el.addEventListener('mousemove', this.handleTouchMove);
				this.$el.addEventListener('mouseup', this.handleTouchEnd);
			}
		}

		this.$$height = this.$el.offsetHeight;
		this.$$touch = {
			inner: this.$el.querySelector('.list-view--inner')
		}
	}

	getPosition(e) {
		if('ontouchstart' in window) {
			return {
				pageY: e.changedTouches[0].pageY,
				pageX: e.changedTouches[0].pageX
			}
		} else {
			return {
				pageY: e.pageY,
				pageX: e.pageX
			}
		}
	}

	handleTouchStart(e) {
		if(!this.$$touch.pageY && this.$el.scrollTop === 0) {
			let {
				pageX,
				pageY
			} = this.getPosition(e);
			this.$$touch.pageY = pageY;
			this.$$touch.pageX = pageX;
			this.$$touch.markHeight = this.$el.querySelector('.list-view--refresh').offsetHeight;
			this.setState({
				status: 0
			});
		}

	}
	handleTouchMove(e) {
		let {
			pageY,
			pageX
		} = this.getPosition(e);
		if(this.$$touch.pageY && this.$$touch.pageY < pageY && Math.abs(pageY - this.$$touch.pageY) > Math.abs(pageX - this.$$touch.pageX)) {
			e.preventDefault();
			e.stopPropagation();
			let top = (pageY - this.$$touch.pageY) * 0.5;    //阻尼系数
			let markHeight = this.$$touch.markHeight;
			top = top > markHeight * 10 ? markHeight * 10 : top;
			let cssText = '-webkit-will-change:transform;will-change:transform;-webkit-transform:translate3d(0,' + top + 'px,0);transform:translate3d(0,' + top + 'px,0);'
			this.innerCss(cssText);

			if(this.$$touch.pageY && pageY - this.$$touch.pageY > (markHeight + 60)) {
				this.$$touch.inner.classList.add('active');

			} else {
				this.$$touch.inner.classList.remove('active');
			}
		}
		if(!this.$$touch.pageY && this.scrollTop <= 0) {
			this.$$touch.pageY = pageY
		} else if(this.scrollTop > 0) {
			this.$$touch.pageY = 0
		}
	}
	handleTouchEnd(e) {
		let {
			pageY
		} = this.getPosition(e);

		if(this.$$touch.pageY && this.$$touch.inner && this.$$touch.pageY < pageY) {
			let markHeight = this.$$touch.markHeight
			if(pageY - this.$$touch.pageY > (markHeight + 20)) {
				this.setState({
					status: 1
				});
				setTimeout(() => {
					let cssText = `-webkit-transform:translate3d(0,${markHeight}px,0);transform:translate3d(0,${markHeight}px,0);-webkit-transition:transform 0.3s ease 0s;transition:transform 0.3s ease 0s;`
					this.innerCss(cssText)
					this.$$touch.inner.classList.remove('active')
					this.$$touch.inner.classList.add('loading')
					this.props.onRefresh && this.props.onRefresh(this.stopLoading)
				}, 0)
			} else {
				let cssText = '-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:transform .3s ease 0s;transition:transform .3s ease 0s;'
				setTimeout(() => {
					this.innerCss(cssText)
					this.$$touch.inner.classList.remove('active');
				}, 0)
			}
			if(this.$$touch.pageY !== pageY) {
				e.stopPropagation()
				e.preventDefault()
			}
		}
		this.$$touch.pageY = 0;
	}
	
	handleScroll(e) {
		if(this.$el.scrollHeight - this.$$height - this.$el.scrollTop <= 10) {
			this.props.onInfinite && this.props.onInfinite(this.hasData);
		}
	}

	stopLoading() {
		if(this.$$touch && this.$$touch.inner && this.$$touch.inner.className.indexOf('loading') > -1) {
			let cssText = '-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:transform 0.36s ease 0s;transition:transform 0.36s ease 0s;';
			this.innerCss(cssText)
			this.$$touch.inner.classList.remove('loading')
		}
	}
    
    hasData(flag){
    	   this.setState({
    	   	  loadstate: flag ? 1:0
    	   })
    }
    
    
	componentWillUnmount() {
		this.$$touch = null
	}

	innerCss(text) {
		this.$$touch.inner.style.cssText = text;
	}

	render() {
		const {
			children,
			loadingText,
			pullDownText,
			refreshText,
			endText,
		} = this.props;

		const {
			status,
			loadstate
		} = this.state;

		return(
			<div ref="$el" className='list-view'>
		        <div className="list-view--inner"> 
		          <div className="list-view--refresh">
		            { status!==1 && <img className="arrow" src={arrow} />}
 		            { status!==1 && <span data-loading={loadingText} data-pulldown={pullDownText} data-refresh={refreshText}></span>}
 		            { status ==1 && <img className="spinner" src={spinner} />}
		          </div>

		          {children}
		          
		          <div className="list-view--infinite">
			          {loadstate==0 && <img className="spinner" src={spinner} />}
			          {loadstate==1 && <div className="nodata">{endText}</div>}
		          </div>
		          
		        </div>
		    </div>
		)
	}
}