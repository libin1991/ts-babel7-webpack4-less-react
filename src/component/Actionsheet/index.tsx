import React from "react";
import ReactDOM from 'react-dom';
import Actionsheet from './actionsheet';

export default class Global extends React.Component {
	constructor(props) {
		super(props);
	}
	static actionsheetEle = '';
	static ele = '';
	static actionsheet(option) {
		var setting = {
			title: '',
			arr: [],
			opacity: 0,
			onItem: () => {},
			onCancel: () => {}
		};

		setting = {
			...setting,
			...option
		};

		this.show(setting);
	}

	static show(setting) {
		if(!this.ele) {
			this.ele = document.createElement('div');
			var id = document.createAttribute("id");
			this.actionsheetEle = 'actionsheetEle-' + new Date().getTime();

			id.value = this.actionsheetEle;
			this.ele.setAttributeNode(id);
			document.body.appendChild(this.ele);
		}

		ReactDOM.render(<Actionsheet setting={setting} />, this.ele);

		setTimeout(() => { // 模拟nextTick
			this.ele.querySelector(".actionsheet").classList.add("active");
		}, 20);

	}

	static hide() {
		var call = (e) => {
			// document.body.removeChild(this.ele);
			ReactDOM.unmountComponentAtNode(this.ele);
		}
		if(this.ele) {
			if("ontransitionend" in window) {
				this.ele.querySelector(".actionsheet").removeEventListener("transitionend", call);
				this.ele.querySelector(".actionsheet").removeEventListener("webkitTransitionEnd", call);

				this.ele.querySelector(".actionsheet").classList.remove("active");
				
				this.ele.querySelector(".actionsheet").addEventListener("transitionend", call,{ passive: true });
				this.ele.querySelector(".actionsheet").addEventListener("webkitTransitionEnd", call,{ passive: true });

			}else{
				this.ele.querySelector(".actionsheet").classList.remove("active");
				setTimeout(call , 300);
			}
		}
	}
}