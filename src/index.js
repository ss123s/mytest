import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter  as Router} from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
	<Router>
		 <LocaleProvider locale={zh_CN}>
			<App />
		</LocaleProvider >
	</Router>
	, document.getElementById('root'));
registerServiceWorker();
