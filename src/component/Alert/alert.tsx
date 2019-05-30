import React from "react";
import './alert.less'

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
				<div className="alert">
					<div className="title1">{title}</div>
					<p className="title2">{content}</p>
					<div className="btnlist onepx-top-border">
						<div className="ok" onClick={(e)=>{onSucc(e)}}>{`${btnSucc} (${timer})`}</div>
					</div>
				</div>
			</div>
		);
	}
}