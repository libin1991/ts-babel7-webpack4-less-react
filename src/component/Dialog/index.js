import React from "react";
import ReactDOM from 'react-dom';
import Dialog from './dialog';

export default class Global {
	static dialogEle = '';

	static dialog(option) {
		var setting = {
			type: 0,
			title: "我是默认title",
			content: "我是默认content",
			btnSucc: "我是默认btn",
			CloseShow: false,
			onClose() {
				console.log("蒙层回调");
			},
			onSucc() {
				console.log("成功回调");
			},
			onFail() {
				console.log("失败回调");
			}
		};

		setting = { 
			...setting,
			...option
		};

		this.show(setting);
	}

	static show(setting) {
		var div = document.createElement('div');
		var id = document.createAttribute("id");

		this.dialogEle = 'dialogEle-' + new Date().getTime();

		id.value = this.dialogEle;
		div.setAttributeNode(id);
		document.body.appendChild(div);

		ReactDOM.render(<Dialog setting={setting} />, div);

	}

	static hide() {
		var dialogEle = document.querySelector("#" + this.dialogEle);
		if(dialogEle) {
			ReactDOM.unmountComponentAtNode(dialogEle);
			document.body.removeChild(dialogEle);
		}
	}
}