# Using Redux
To change data we need to `dispatch` an `action`.

```plantuml
:dispatch;
split
    :Reducer 1;
split again 
    :Reducer 2;
end split
:store;
:state;
```

To get a snapshot of the data `store.getState()`.

To obtain data we need to get the current `state` of the `store`.

## Redux without React
Create `client/index.js`
```js
import { createStore } from 'redux';

//Reducers
function counter(state = { value: 0 }, action) {
    switch (action.type) {
        case 'INC':
            return { ...state, value: state.value + 1 };
        case 'DEC':
            return { ...state, value: state.value - 1 };
    }
    return state;
}

//Actions
function doIncrement() {
    return {
        type: 'INC'
    }
}

function doDecrement() {
    return {
        type: 'DEC'
    }
}

//Store
let store = createStore(counter);

//Subscriber
store.subscribe(() => console.log(store.getState()));

// Dispatch action
store.dispatch(doIncrement());
store.dispatch(doIncrement());
store.dispatch(doDecrement());

export default store;
```

## Redux integrated with React
`Provider` is a `React` component from `react-redux` library, it provides the store to its child components.

```html
<Provider store={store}>
    <App/>
</Provider>
```

The store is now provided to the application, now `connect` our `components` to it. Retrieve data by obtaining current `state`, or Change its `state` by sending and `action` with `dispatch`. `connect` maps the `store` `state` and `dispatch` to the `props` of a `component`.

```tsx
import React from 'react';
import { connect } from 'react-redux';

const MyComponent = props => (
    <div>
        <h1>MyComponent</h1>
        <span>Value={props.text}</span><br/>
        <button onClick={props.onINC}>INC</button>&nbsp;-&nbsp;
        <button onClick={props.onDEC}>DEC</button>
    </div>
)

const mapStateToProps = state => ({
    text: state.value
})

const doINC = () => ({
    type: 'INC'
})

const doDEC = () => ({
    type: 'DEC'
})

const mapDispatchToProps = dispatch => ({
    onINC: () => dispatch(doINC()),
    onDEC: () => dispatch(doDEC())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponent);
```

## Setup express + ES6 + babel + webpack
```
yarn add --dev express babel-cli babel-preset-env
```
Add Task `package.json`
```
"scripts": {
    "server": " babel-node server/index.js"
}
```
Create `.babelrc`
```json
{
    "presets": ["env"]
}
```

Add `nodemon` to watch and restart express
`yarn add --dev nodemon`

Update `package.json`
```json
"scripts": {
  "server": "nodemon --watch server --exec babel-node -- server/index.js"
}
```

Add Client support with webpack and babel

`yarn add --dev webpack webpack-dev-middleware babel-loader babel-plugin-transform-object-rest-spread`

Update `server/index.html`
```html
<script src="/bundle.js"></script>
</body>
```

Create `webpack.config.dev.js`
```js
import path from 'path';

export default {
    mode: 'development',
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
```

Update `.babelrc`
```json
    "plugins": [
        "transform-object-rest-spread"
    ]
```

Update `server/index.js`
```
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';

let app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));
```

Add `redux` with `yarn add --dev redux`

## Setup React support

Add React client-side support `yarn add --dev react react-dom babel-preset-react`

Update `.babelrc`
```json
"presets": [
    "env",
    "react"
]
```

Update `server/index.html`
```html
<!-- App component mount point -->
<div id="app"></div>
```

Move `client/index.js` to `client/couter.js`

Replace `client/index.js`
```js
import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

render(<App />, document.getElementById('app'));
```

Create `client/components/App.js`
```js
import React from 'react';

export default () => (
    <h1>Hello from react</h1>
);
```

## Redux with React
`Provider` wraps `App` and `store` passed in.

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './counter.js';

render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
```

## Add Redux-DevTools
`yarn add -D redux-devtools redux-devtools-dock-monitor redux-devtools-log-monitor`

## Create `./components/DevTools.js`

```js
import React from 'react';

import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
        changePositionKey='ctrl-q'
        defaultIsVisible={true}>
        <LogMonitor theme='tomorrow' />
    </DockMonitor>
)

export default DevTools;
```
## Update `client/index.js`
```js
import DevTools from './components/DevTools';

<Provider store={store}>
    <div>
        <App />
        <DevTools />
    </div>
</Provider>
```

## Update `store` in `client/counter.js`
```js
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from './components/DevTools';

const enhancer = compose(
    // Middleware for development
    //Required!
    DevTools.instrument()
)

let store = createStore(counter, {value:0}, enhancer);
```