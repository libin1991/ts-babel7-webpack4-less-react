import React from "react";
import './alert.less'

import {Transition} from '@/baidu/transition/Transition'
import {TransitionGroup} from '@/baidu/transition/TransitionGroup'

//import Transition from '../transition/Transition'
//import TransitionGroup from '../transition/TransitionGroup'

export default class Alert extends React.Component {
	render() {
		let {
			content,
			opacity,
			title,
			timer,
			btnSucc,
			onSucc
		} = this.props.setting;

		let style = {
			"background": `rgba(0,0,0,${opacity})`
		}

		return(
			<div className="mask" style={style}>
			    <TransitionGroup component="div">
				  <Transition className="fade"> 
					<div className="alert">
						<div className="title1">{title}</div>
						<p className="title1 title2">{content}</p>
						<div className="btnlist onepx-top-border">
							<div className="ok" onClick={(e)=>{onSucc(e)}}>{`${btnSucc}`}</div>
						</div>
					</div>
				  </Transition>
				</TransitionGroup>
			</div>
		);
	}
}