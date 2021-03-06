import React, {Component} from 'react';

import { number } from 'prop-types';

interface Props {
    list: Array<any>,
    page: Array<any>
}

interface State {
    list: Array<any>,   // 0 箭头  1 loading
    page: any
}

export class Tab extends Component<Partial<Props>, Partial<State>> {

    $el: any;
    $animate: any;
    windowWidth: number;
    index: number;
    $contentSlider: any;
    $$touch: any;
    state: any;
    count: number;

    constructor(props: any) {
        super(props);

        this.$el = null; // 事件绑定
        this.$animate = null;
        this.windowWidth = 0; // 页面宽度
        this.$contentSlider = null;
        this.index = 0;
        this.count = 0;
        this.$$touch = {};
        this.state = {
            list: props.list || [],
            page: props.page || []
        };

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        this.tabClick = this.tabClick.bind(this);
    }

    getWindow() {
        this.$el = this.refs.$el;
        this.$animate = this.refs.$animate;

        this.$contentSlider = this.$el.getElementsByClassName('content-slider')[0];

        const navContainer: any = this.refs.$navContainer;
        this.windowWidth = navContainer.offsetWidth || document.documentElement.offsetWidth || document.body.offsetWidth;
        this.count = this.state.list.length;

        this.$contentSlider.style.width = this.windowWidth * this.count + 'px';
        this.$contentSlider.style.left = '0px';

        this.$animate.style.width = this.windowWidth / this.count + 'px';
        this.$animate.style.left = '0px';

        this.$$touch = {
            touching: false,
            pageY: 0,
            pageX: 0,
            startTime: 0,
            endTime: 0,
            offset: 0
        };

        if ( 'ontouchstart' in window ) {
            this.$el.addEventListener('touchstart', this.handleTouchStart);
            this.$el.addEventListener('touchmove', this.handleTouchMove);
            this.$el.addEventListener('touchend', this.handleTouchEnd);
        } else {
            this.$el.addEventListener('mousedown', this.handleTouchStart);
            this.$el.addEventListener('mousemove', this.handleTouchMove);
            this.$el.addEventListener('mouseup', this.handleTouchEnd);
        }
    }

    getPosition(e: any) {
        if ('ontouchstart' in window) {
            return {
                pageY: e.changedTouches[0].pageY,
                pageX: e.changedTouches[0].pageX
            };
        } else {
            return {
                pageY: e.pageY,
                pageX: e.pageX
            };
        }
    }
    handleTouchStart(e: any) {
        const {
            pageX,
            pageY
        } = this.getPosition(e);

        this.$$touch.startTime = e.timeStamp;
        this.$$touch.touching = true;
        this.$$touch.pageY = pageY;
        this.$$touch.pageX = pageX;
    }
    handleTouchMove(e: any) {
        if (!this.$$touch.touching) return;
        const {
            pageX,
            pageY
        } = this.getPosition(e);

        const offsetX = pageX - this.$$touch.pageX;

        this.$contentSlider.style.WebkitTransition = 'all 0s';
        this.$contentSlider.style.transition = 'all 0s';
        this.$contentSlider.style.left = this.$$touch.offset + offsetX + 'px';

        this.$animate.style.WebkitTransition = 'all 0s';
        this.$animate.style.transition = 'all 0s';
        if (parseInt(this.$contentSlider.style.left) > 0 || parseInt(this.$contentSlider.style.left) < -this.windowWidth * (this.count - 1) ) {
            return false;
        }
        this.$animate.style.left = Math.abs(parseInt(this.$contentSlider.style.left) / parseInt(this.$contentSlider.style.width) * 100) + '%';
    }
    handleTouchEnd(e: any) {
        this.$$touch.touching = false;

        const {
            pageX,
            pageY
        } = this.getPosition(e);

        const endTime = e.timeStamp;

        this.$contentSlider.style.WebkitTransition = 'all 300ms ease';
        this.$contentSlider.style.transition = 'all 300ms ease';

        this.$animate.style.WebkitTransition = 'all 300ms ease';
        this.$animate.style.transition = 'all 300ms ease';

        if ( pageX - this.$$touch.pageX < -40) {   // 左滑
            this.index = ++this.index >= this.count ? this.index - 1 : this.index;
            this.$contentSlider.style.left = -(this.index * this.windowWidth) + 'px';
            this.$$touch.offset = -(this.index * this.windowWidth);

        } else if (pageX - this.$$touch.pageX > 40) {  // 右滑
            this.index = --this.index < 0 ? 0 : this.index;
            this.$contentSlider.style.left = -(this.index * this.windowWidth) + 'px';
            this.$$touch.offset = -(this.index * this.windowWidth);
        } else {
            this.$contentSlider.style.left = - this.index * this.windowWidth + 'px';
        }

        this.$animate.style.left = Math.abs(parseInt(this.$contentSlider.style.left) / parseInt(this.$contentSlider.style.width) * 100) + '%';
    }

    componentDidMount() {
        this.getWindow();
        window.addEventListener('resize', this.getWindow.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getWindow.bind(this));
    }

    tabClick(index: number, e: any) {
        this.index = index;
        this.$$touch.offset = -(this.index * this.windowWidth);
        this.$contentSlider.style.WebkitTransition = 'all 300ms ease';
        this.$contentSlider.style.transition = 'all 300ms ease';
        this.$animate.style.WebkitTransition = 'all 300ms ease';
        this.$animate.style.transition = 'all 300ms ease';
        this.$contentSlider.style.left = - this.index * this.windowWidth + 'px';
        this.$animate.style.left = Math.abs(parseInt(this.$contentSlider.style.left) / parseInt(this.$contentSlider.style.width) * 100) + '%';
    }

    render() {
        const {
            list,
            page
        } = this.state;

        return(
            <div ref='$navContainer' className='nav-container'>
                <ul className='nav-title'>
                    {list.map((item: any, index: number) => {
                        return <li onClick={this.tabClick.bind( this, index) }
                                   className='title-item' key={index}>{item}
                               </li> ;
                    })}
                    <div className='withAnimate' ref='$animate'></div>
                </ul>

                <div ref='$el' className='content'>
                    <ul className='content-slider'>
                        {page.map((item: any, index: number) => {
                            return <li key={index} className='content-item'>{item}</li>;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}