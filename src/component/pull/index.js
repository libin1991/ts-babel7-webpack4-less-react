import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TOP_DEFAULT_CONFIG, BOTTOM_DEFAULT_CONFIG } from './config';
import { throttle, create, PASSIVE_OPTS } from './utils';

import './index.css';

export default class PullTo extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      startY: null,
      startX: null,
      distance: 0,
      diff: 0,
      beforeDiff: 0,
      state: '',
      shouldPullDown: false,
      shouldPullUp: false,
      shouldPassThroughEvent: false,
      throttleEmitTopPull: null,
      throttleEmitBottomPull: null,
      throttleEmitScroll: null,
      throttleOnInfiniteScroll: null
    };
  }

  static propTypes = {
    distanceIndex: PropTypes.number,
    topBlockHeight: PropTypes.number,
    bottomBlockHeight: PropTypes.number,
    wrapperHeight: PropTypes.string,
    topLoadMethod: PropTypes.function,
    bottomLoadMethod: PropTypes.function,
    isThrottleTopPull: PropTypes.boolean,
    isThrottleBottomPull: PropTypes.boolean,
    isThrottleScroll: PropTypes.boolean,
    isTouchSensitive: PropTypes.boolean,
    isScrollSensitive: PropTypes.boolean,
    isTopBounce: PropTypes.boolean,
    isBottomBounce: PropTypes.boolean,
    isBottomKeepScroll: PropTypes.boolean,
    topConfig: PropTypes.object,
    bottomConfig: PropTypes.object
  };
  static defaultProps = {
    distanceIndex: 2,
    topBlockHeight: 50,
    bottomBlockHeight: 50,
    wrapperHeight: '100%',
    isThrottleTopPull: true,
    isThrottleBottomPull: true,
    isThrottleScroll: true,
    isTouchSensitive: true,
    isScrollSensitive: true,
    isTopBounce: true,
    isBottomBounce: true
  };

  scrollTo(y, duration = 200, delay = 0) {
    this.setState({
      diff: y
    });
    const el = this.$refs['action-block-bottom'];
    const fl = this.$refs['bottom-filler'];
    const sd = this.$el.style;
    setTransition(
      sd,
      duration > 0 || delay > 0 ? 'transform' : 'none',
      `${duration}ms`,
      `${delay}ms`
    );
    sd.setProperty('transform', `translate(0, ${y}px)`);
  }

  checkBottomReached() {
    const el = this.$refs['scroll-container'];
    return el.scrollTop + el.offsetHeight + 1 >= el.scrollHeight;
  }

  handleTouchStart(event) {
    [
      { clientY: this.state.startY, clientX: this.state.startX }
    ] = event.touches;
    this.setState({
      beforeDiff: this.state.diff
    });
    const sc = this.$refs['scroll-container'];
    this.setState({
      shouldPullDown: this.props.isTopBounce && sc.scrollTop === 0
    });
    this.setState({
      shouldPullUp: this.props.isBottomBounce && this.checkBottomReached()
    });
    this.setState({
      shouldPassThroughEvent: false
    });
  }

  handleTouchMove(event) {
    const [{ clientY, clientX }] = event.touches;
    const { startY, startX } = this;
    let dist =
      (clientY - startY) / this.props.distanceIndex + this.state.beforeDiff;
    const s0 = this.state.state;
    this.setState({
      distance: dist
    }); // judge pan gesture direction, if not vertical just return
    // make sure that if some components embeded can handle horizontal pan gesture in here

    let pe = this.state.shouldPassThroughEvent;
    event.preventDefault();
    this.scrollTo(dist, 0);
    let c;
    const s = Math.abs(dist) < c.triggerDistance ? 'pull' : 'trigger';
  }

  handleTouchEnd() {
    this.setState({
      startX: (this.startY = null)
    });
  }

  handleScroll(event) {
    this.props.isThrottleScroll
      ? this.state.throttleEmitScroll(event)
      : this.$emit('scroll', event);
    this.state.throttleOnInfiniteScroll();
  }

  handleTransitionEnd(event) {}

  bindEvents() {}

  updateTouchSensitivity(flag) {
    const el = this.$refs['scroll-container'];
  }

  updateScrollSensitivity(flag) {
    const el = this.$refs['scroll-container'];
  }

  createThrottleMethods() {
    const throttleEmit = (delay, mustRunDelay = 0, eventName) => {
      return throttle(this.$emit.bind(this, eventName), delay, mustRunDelay);
    };

    this.setState({
      throttleEmitTopPull: throttleEmit(200, 300, 'top-pull')
    });
    this.setState({
      throttleEmitBottomPull: throttleEmit(200, 300, 'bottom-pull')
    });
    this.setState({
      throttleEmitScroll: throttleEmit(100, 150, 'scroll')
    });
    this.setState({
      throttleOnInfiniteScroll: throttle(() => {
        if (this.checkBottomReached()) {
          this.$emit('infinite-scroll');
        }
      }, 400)
    });
  }

  init() {
    this.createThrottleMethods();
    this.bindEvents();
  }

  componentDidMount() {
    this.init();
  }

  _topConfig() {
    return create(TOP_DEFAULT_CONFIG, this.props.topConfig);
  }

  _bottomConfig() {
    return create(BOTTOM_DEFAULT_CONFIG, this.props.bottomConfig);
  }

  topText() {
    return '';
  }

  bottomText() {
    return '';
  }

  render() {
    const { state, diff } = this.state;
    const topText = this.topText();
    const bottomText = this.bottomText();
    return (
    	
      <div className="vue-pull-to-wrapper">
      
      
        {topLoadMethod && (
          <div className="action-block action-block-top">
            <slot
              state={state}
              state-text={topText}
              trigger-distance={_topConfig.triggerDistance}
              diff={diff}
            >
              <p className="default-text">{topText}</p>
            </slot>
          </div>
        )}
        
        
        <div className="scroll-container">
          <slot />
          {bottomLoadMethod && isBottomKeepScroll && (
            <div className="bottom-filler" />
          )}
        </div>
        
        
        
        
        {bottomLoadMethod && (
          <div className="action-block action-block-bottom">
            <slot
              state={state}
              state-text={bottomText}
              trigger-distance={_bottomConfig.triggerDistance}
              diff={diff}
            >
              <p className="default-text">{bottomText}</p>
            </slot>
          </div>
        )}
      </div>
    );
  }
}
