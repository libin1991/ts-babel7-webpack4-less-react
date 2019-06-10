import * as React from 'react';
import * as ReactDom from 'react-dom';
import "@/assets/css/reset.less"
import { AppContainer } from "react-hot-loader";
import App from '@/pages/toast/index'

ReactDom.render(<App />, document.getElementById('main'));

if (module.hot) { 
  module.hot.accept("@/pages/toast/index", () => {
    const Router = require("@/pages/toast/index").default;
    ReactDom.render(<App />, document.getElementById('main'));
  });
}
 

