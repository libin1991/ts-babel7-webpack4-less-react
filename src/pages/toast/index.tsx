// import * as React from 'react';
import './css/App.less';
import React from 'react';
import ReactDOM from 'react-dom';

import logo from './img/logo.svg';
import $ from '@/component/Toast/index';
import $1 from '@/component/Dialog/index';
import $2 from '@/component/Alert/index';
import $3 from '@/component/Loading/index';
import $4 from '@/component/Actionsheet/index';



export default class App extends React.Component {

    toast() {
        //		$.toast({
        //			type: 3,
        //			content: "我是默认Toast",
        //			time: 1000,
        //			opacity: .5,
        //			callback() {
        //				console.log("我是Toast的回调！")
        //			}
        //		});

        //$.toast("操作成功！！！");
        $.success("充值成功",2500);

//		$.warning("哈哈组哈哈组件哈哈哈哈组件哈哈哈哈组件哈哈件哈哈", 10000000000, 0, () => {
//			console.log("ok")
//		})
    }

    dialog() {
        $1.dialog({
            type: 0,
            opacity: 0.5,
            title: "我是title",
            content: "我是content",

            btnSucc: "我是成功",
            onSucc(e) {
                e.stopPropagation();
                $.toast("哈哈组哈哈");
                //console.log("我是成功的回调！");
            },

            btnFail: "我是取消",
            onFail(e) {
                e.stopPropagation();
                console.log("我是失败的回调！");
            },

            onClose(e) {
                console.log("我是蒙层的关闭回调！");
                $1.hide();
            }
        });
    }

    loading() {
        $3.loading({
            type: 0,
            content: "我是默认我是默认",
            opacity: .3
        });

        //$3.loading('疯狂加载中',0,.4);
        setTimeout(() => { //3s后隐藏
            $3.hide();
        }, 3000);
    }

    alert() {
        $2.alert({
            type: 0,
            opacity: 0.5,
            title: "提示信息",
            content: "消息提示成功",
            btnSucc: "确定",
            onSucc(e) {
                $2.hide()
            }
        });
    }

    actionsheet() {
        $4.actionsheet({
            title: '我是标题',
            arr: ['编辑', '收藏', '分享', '删除'],
            opacity: .3,
            onItem(obj, index) {
                console.log(obj, index);
                $4.hide();
            },
            onCancel(e) {
                $4.hide();
            }
        })
    }
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img alt={`img`} src={logo} className="App-logo2" />
                </div>
                <div>
                    <button onClick={this.loading}>点击弹出loading</button>
                </div>
                <div>
                    <button onClick={this.toast}>点击弹出Toast</button>
                </div>
                <div>
                    <button onClick={this.dialog}>点击弹出dialog</button>
                </div>
                <div>
                    <button onClick={this.alert}>点击弹出Alert</button>
                </div>
                <div>
                    <button onClick={this.actionsheet}>点击弹出Actionsheet</button>
                </div>
            </div>
        );
    }
}