import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getContentRender from './js/render';
import Scroller from './js/core';

import "./css/index.css";
import arrow from "./img/arrow.svg";
import spinner from "./img/spinner.svg";

export default class ReactComponent extends Component {
	
	static defaultProps = {
		refreshText: '下拉刷新',
		refreshingText: '释放更新',
		noDataText: '没有更多数据了',

		snapping: false,
		snapWidth: 100,
		snapHeight: 100,
		
		animating: true,
		animationDuration: 250,
		bouncing: true,
		
		height: 60,
		fontSize:16,
		arrowW:20,
		spinnerW:32
		
	};

	constructor(props) {
		super(props);

		this.$el = null;
		
		this.container = ''; //外层容器
		this.content = ''; //内层容器
		
		this.pullToRefreshLayer = ''; //下拉刷新区域
		this.scroller = ''; //滚动对象
		this.infiniteTimer = ''; //下拉刷新定时器
		
		this.mousedown = false; //鼠标按下
		this.resizeTimer = null; //resize变化

		this.state = {
			status : 0 ,   // 0:向下, 1: 向上, 2: 转圈
			loadingState :0, // 0: stop, 1: loading, 2: stopping loading
		    showLoading : false //加载中
		};

		this.finishPullToRefresh = this.finishPullToRefresh.bind(this);
		this.finishInfinite = this.finishInfinite.bind(this);

		this.touchStart = this.touchStart.bind(this);
		this.touchMove = this.touchMove.bind(this);
		this.touchEnd = this.touchEnd.bind(this);

		this.mouseDown = this.mouseDown.bind(this);
		this.mouseMove = this.mouseMove.bind(this);
		this.mouseUp = this.mouseUp.bind(this);

	}
	componentDidMount() {
		this.$el = this.refs.$container;
		this.container = this.refs.$container;
		
		this.container.style.width = '100%';
		this.container.style.height = `calc(100% + ${this.props.height}px)`;

		this.content = this.refs.$contain;
		this.pullToRefreshLayer = this.content.getElementsByTagName("div")[0];

		let render = getContentRender(this.content);

		var {
			snapping,
			animating,
			animationDuration,
			bouncing
		} = this.props;

		this.scroller = new Scroller(render, {
			scrollingX: false,
			snapping: snapping,
			animating: animating,
			animationDuration: animationDuration,
			bouncing: bouncing
		});
        
		if(this.props.onRefresh) {    // 下拉刷新
			this.scroller.activatePullToRefresh(60, () => {
				this.setState({
					status: 1
				});
			}, () => {
				this.setState({
					status: 0
				});
			}, () => {
				this.setState({
					status: 2
				},()=>{
					this.props.onRefresh(this.finishPullToRefresh)
				});
			});
		}
		
		
		var  beforeScrollTop=0;
		if(this.props.onInfinite) {    // 无限加载
			this.infiniteTimer = setInterval(() => {
				let {
					left,
					top,
					zoom
				} = this.scroller.getValues();
				
                var delta = top - beforeScrollTop;
                !!delta&&this.props.onScroll&&this.props.onScroll( top , delta > 0 ? "down" : "up" );
			    beforeScrollTop = top;
                
				if((this.content.offsetHeight > 0) && (this.container.clientHeight + top + 10 > this.content.offsetHeight)) {
					if(this.state.loadingState) return
					this.setState({
						loadingState:1,
						showLoading:true
					},()=>{
						this.props.onInfinite(this.finishInfinite)
					});
				}
			}, 10);
		}
		
		
		let rect = this.container.getBoundingClientRect();
		
		this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop)

        window.$scroller=this.scroller;

		if(this.props.snapping) {
			this.scroller.setSnapSize(this.props.snapWidth, this.props.snapHeight)
		}
		
		const contentSize = () => {
			return {
				width: this.content.offsetWidth,
				height: this.content.offsetHeight
			}
		}

		let  content_width,content_height;
		 
		this.resizeTimer = setInterval(() => {
			let {
				width,
				height
			} = contentSize();

			if(width !== content_width || height !== content_height) {
				content_width = width
				content_height = height
				this.resize()
			}
		}, 10);
		
		
		if('ontouchstart' in window) {
			this.$el.addEventListener('touchstart', this.touchStart);
			this.$el.addEventListener('touchmove', this.touchMove);
			this.$el.addEventListener('touchend', this.touchEnd);
		} else {
			this.$el.addEventListener('mousedown', this.mouseDown);
			this.$el.addEventListener('mousemove', this.mouseMove);
			this.$el.addEventListener('mouseup', this.mouseUp);
		}
	}
	
    componentWillUnmount(){
    	   clearInterval(this.resizeTimer);
    	   if(this.infiniteTimer)  clearInterval(this.infiniteTimer);
    }
    
	resize() {
		let container = this.container;
		let content = this.content;
		this.scroller.setDimensions(
			container.clientWidth,
			container.clientHeight,
			content.offsetWidth,
			content.offsetHeight
		);
	}

	finishPullToRefresh() {   // 下拉刷新完成
		this.setState({
			status: -1
		},()=>{
			this.scroller.finishPullToRefresh();
		})
	}

	finishInfinite(hideSpinner) {  // 无限加载完成
		this.setState({
			loadingState: hideSpinner ? 2 : 0,
			showLoading: false
		},()=>{
			if(this.state.loadingState == 2) {
				this.resetLoadingState()
			}
		});
	}
	
    resetLoadingState() {
		let {
			left,
			top,
			zoom
		} = this.scroller.getValues();
		
		if (this.container.clientHeight + top + 60 > this.content.offsetHeight) {
          setTimeout(() => {
            this.resetLoadingState()
          }, 1000)
        } else {
        	  this.setState({
        	  	loadingState:0
        	  })
        }
	}

   getPosition() {
		let v = this.scroller.getValues();
		return {
			left: parseInt(v.left),
			top: parseInt(v.top)
		};
	}

	triggerPullToRefresh() {
		this.scroller.triggerPullToRefresh();
	}

	scrollTo(x, y, animate) {
		this.scroller.scrollTo(x, y, animate);
	}

	scrollBy(x, y, animate) {
		this.scroller.scrollBy(x, y, animate);
	}


	touchStart(e) {
		if(e.target.tagName.match(/input|textarea|select/i)) {
			return
		}
		this.scroller.doTouchStart(e.touches, e.timeStamp);
	}

	touchMove(e) {
		e.preventDefault();
		this.scroller.doTouchMove(e.touches, e.timeStamp);
	}

	touchEnd(e) {
		this.scroller.doTouchEnd(e.timeStamp);
	}

	mouseDown(e) {
		this.scroller.doTouchStart(
			[{
				pageX: e.pageX,
				pageY: e.pageY
			}],
			e.timeStamp
		);
		this.setState({
			mousedown: true
		});
	}

	mouseMove(e) {
		this.scroller.doTouchMove(
			[{
				pageX: e.pageX,
				pageY: e.pageY
			}],
			e.timeStamp
		);
		this.setState({
			mousedown: true
		});
	}

	mouseUp(e) {
		this.scroller.doTouchEnd(e.timeStamp);
		this.setState({
			mousedown: false
		});
	}

	render() {
		const {
			status,
			showLoading,
			loadingState
		} = this.state;
		
		const {
			onRefresh,
			refreshText,
			refreshingText,
			noDataText,
			children
		} = this.props;

		return(
			<div ref="$container" className="_v-container" style={{top:-this.props.height}}>
		         <div ref="$contain" className="_v-content">
		           <div className={`pull-to-refresh-layer ${status == 1 ? "active":""} ${status == 2?"active refreshing":""}`} style={{height:this.props.height,fontSize:this.props.fontSize}}>
						{onRefresh && <span className="spinner-holder">
						    {status!= 2 && <img  className="arrow" src={arrow} style={{height:this.props.arrowW,width:this.props.arrowW}} />}
					        {status!= 2 && <span className="text" style={{color: '#aaaaaa',fontSize:14,lineHeight: '20PX'}}>{ status == 1 ? refreshingText : refreshText} </span> }
					        {status == 2 && <img className="spinner" src={spinner} style={{height:this.props.spinnerW,width:this.props.spinnerW}} />}
						</span>}
					</div>
					
					{children}
					
					<div className="loading-layer" style={{height:this.props.height,fontSize:this.props.fontSize}}>
				        <span className={`spinner-holder ${showLoading ? "active":""}`}>
				            <img className="spinner" src={spinner}  style={{height:this.props.spinnerW,width:this.props.spinnerW}} />
				        </span>
				        
				        <div className={`no-data-text ${!showLoading && loadingState == 2 ? "active":""}`}>{noDataText}</div>
				    </div>
		         </div>
            </div>
		);
	}
}