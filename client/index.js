import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import DevTools from './components/DevTools';

import store from './counter.js';

render(<Provider store={store}>
    <div>
        <App />
        <DevTools />
    </div>
</Provider>, document.getElementById('app'));