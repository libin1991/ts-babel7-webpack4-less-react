import React from "react";
import ReactDOM from 'react-dom';
import Alert from './alert';

export default class Global {
	static alertEle = '';

	static alert(option) {
		var setting = {
			type: 0,
			title: "我是默认title",
			content: "我是默认content",
			btnSucc: "我是默认btn",
			CloseShow: false,
			timer:0,
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

		this.alertEle = 'alertEle-' + new Date().getTime();

		id.value = this.alertEle;
		div.setAttributeNode(id);
		document.body.appendChild(div);

		ReactDOM.render(<Alert setting={setting} />, div);
        
        if(setting.timer){
        	   var ti=setInterval(()=>{
        	      setting.timer--;
        	   	  ReactDOM.render(<Alert setting={setting} />, div);
        	   	  if(setting.timer<0){
        	   	  	 clearInterval(ti);
        	   	  	 this.hide();
        	   	  }
        	   },1000)
        }
        
	}

	static hide() {
		var alertEle = document.querySelector("#" + this.alertEle);
		if(alertEle) {
			ReactDOM.unmountComponentAtNode(alertEle);
			document.body.removeChild(alertEle);
		}
	}
}