import React from 'react';
import ReactDOM from 'react-dom';
import ContactManger from './component/ContactManger';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ContactManger />, document.getElementById('root'));
registerServiceWorker();
