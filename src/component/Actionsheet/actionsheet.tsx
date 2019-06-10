import React from "react"
import './actionsheet.less';
 

export default class Actionsheet extends React.Component {
	taClick(event, flag, ...list) {
		event.preventDefault();
		event.stopPropagation();
		// 阻止与原生事件的冒泡
		event.nativeEvent.stopImmediatePropagation();
		if (flag === -1) {
			this.props.setting.onCancel();
		} else if (flag === 1) {
			this.props.setting.onItem(...list);
		}
	}

	render() {

		let {
			arr,
			title,
			opacity
		} = this.props.setting;

		let style = {
			"background": `rgba(0,0,0,${opacity})`
		}

		return (
			<div key="uniqueKey"
				className="mask"
				style={style}
				onClick={(e) => this.taClick(e, -1)}>
				<div>
					 
						<div className='actionsheet' ref="actionsheet">
							<div className="line actionsheet-title onepx-bottom-border"
								onClick={(e) => this.taClick(e)}>{title}</div>
							<div className="actionsheecon">
								{arr.map((item, index) => {
									return <div key={index}
										className="line actionsheecon-item onepx-bottom-border"
										onClick={(e) => this.taClick(e, 1, item, index)}>
										{item}
									</div>
								})}
							</div>
							<div className="line actionsheet-cancel" onClick={(e) => this.taClick(e, -1)}>取消</div>
						</div>
					 
				</div>

			</div>
		);
	}
}