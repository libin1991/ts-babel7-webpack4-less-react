import React from "react";
import './loading.less'

export default class Toast extends React.Component {
	checkToast(n) {
		switch(n) {
			case 0:
				return(
					<div className="loading-icon">
					    <div className="wrapper">
				        	<div className="spinner"></div>
				        </div>
				    </div>
				)

			case 1:
				return(
					<div className="loading-icon">
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				          <span></span>
				        </div>
				)
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
			    <div className="loading">
			        {this.checkToast(type)}
			        <div className="msg">{content}</div>
			    </div>
			</div>
		);
	}
}