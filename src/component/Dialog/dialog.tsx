import React from "react";
import './dialog.less'
import Transition from '../transition/Transition'
import TransitionGroup from '../transition/TransitionGroup'
export default class Dialog extends React.Component {

	render() {
		let {
			content,
			opacity,
			title,
			
			btnSucc,
			onSucc,
			
			btnFail,
			onFail,
			
			onClose
		} = this.props.setting;

		let style = {
			"background": `rgba(0,0,0,${opacity})`
		}

		return(
			<div className="mask" onClick={(e)=>{onClose(e)}} style={style}>
			    <TransitionGroup component="div">
				  <Transition className="slideDown"> 
					<div className="dialog">
						<div className="title1">{title}</div>
						<p className="title1 title2">{content}</p>
						<div className="btnlist onepx-top-border">
							<div className="ok" onClick={(e)=>{onSucc(e)}}>{btnSucc}</div>
							<div className="abort onepx-left-border" onClick={(e)=>{onFail(e)}}>{btnFail}</div>
						</div>
					</div>
				  </Transition>
				</TransitionGroup>
			</div>
		);
	}
}