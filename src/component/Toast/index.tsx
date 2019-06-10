import React from "react";
import ReactDOM from 'react-dom';
import Toast from './toast';

export default class Global {
	static toastEle = '';
	static toast(content = '', time = 2000, opacity = 0, callback = () => { }, type = 100) {
		var setting = {
			type: 0,
			content: "",
			time: 2000,
			opacity: 0,
			callback: () => { }
		};

		if (typeof content == "string") {
			setting = {
				...setting,
				content,
				time,
				opacity,
				type,
				callback
			}
		} else {
			setting = {
				...setting,
				...content
			}
		}

		setTimeout(() => {
			this.hide();
			setting.callback();
		}, setting.time);

		this.show(setting);

	}
	static success(text, time, opacity, callback) {
		this.toast(text, time, opacity, callback, 0);
	}

	static fail(text, time, opacity, callback) {
		this.toast(text, time, opacity, callback, 1);
	}

	static warning(text, time, opacity, callback) {
		this.toast(text, time, opacity, callback, 2);
	}

	static show(setting) {

		var div = document.createElement('div');
		var id = document.createAttribute("id");

		this.toastEle = 'toastEle-' + new Date().getTime();

		id.value = this.toastEle;
		div.setAttributeNode(id);
		document.body.appendChild(div);

		ReactDOM.render(<Toast setting={setting} />, div);
	}

	static hide() {
		var toastEle = document.querySelector("#" + this.toastEle);
		if (toastEle) {
			ReactDOM.unmountComponentAtNode(toastEle);
			document.body.removeChild(toastEle);
		}
	}
}