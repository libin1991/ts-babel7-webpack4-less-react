import React from "react";
import './toast.less'

import Transition from '../transition/Transition'
import TransitionGroup from '../transition/TransitionGroup'


export default class Toast extends React.Component {
	checkToast(n) {
		switch(n) {
			case 0:
				return(<div className="icon">
				          <div className="success-icon"></div>
			           </div>)
			case 1:
				return(<div className="icon">
				          <div className="fail-icon"></div>
			           </div>)
			case 2:
				return(<div className="icon">
				          <div className="warning-icon"></div>
			           </div>)
			default:
				return null
		}
	}

	render() {

		let {
			type,
			content,
			opacity = 0
		} = this.props.setting;

		let style = {
			"background": `rgba(0,0,0,${opacity})`
		}

		return(
			<div className="mask" style={style}>
			 <TransitionGroup component="div">
				  <Transition className="slideDown"> 
				     <div className="toast">
				        {this.checkToast(type)}
				        <div className="msg">{content}</div>
				     </div>
				   </Transition>
				</TransitionGroup>
			</div>
		);
	}
}