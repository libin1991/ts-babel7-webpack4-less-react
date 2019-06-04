import React from "react";
import ReactDOM from 'react-dom';
import Alert from './alert';

export default class Global {
	static alertEle = '';

	static alert(option) {
		var setting = {
			type: 0,
			title: "提示信息",
			content: "消息提示成功",
			btnSucc: "确定",
			CloseShow: false,
			timer:0,
			onClose() {
				console.log("");
			},
			onSucc() {
				console.log("");
			},
			onFail() {
				console.log("");
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

		this.alertEle = 'alertEle-' + new Date().getTime();

		id.value = this.alertEle;
		div.setAttributeNode(id);
		document.body.appendChild(div);

		ReactDOM.render(<Alert setting={setting} />, div);
        
	}

	static hide() {
		var alertEle = document.querySelector("#" + this.alertEle);
		if(alertEle) {
			ReactDOM.unmountComponentAtNode(alertEle);
			document.body.removeChild(alertEle);
		}
	}
}