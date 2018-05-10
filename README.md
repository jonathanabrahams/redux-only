# Using Redux on its own
To change data we need to `dispatch` an `action`.

![PlantUML](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuR9AoImkI2n9ph3cAYx8oIpXKW02gw3KbDBar285GwYeGc9wOcQU0ggaaJLNQbwA0aIRLN59Vb6gDOXEB07I3a0feFa0)
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

`Provider` is a `React` component from `react-redux` library, it provides the store to its child components.

```html
<Provider store={store}>
    <App/>
</Provider>
```

The store is now provided to the application, now `connect` our `components` to it. Retrieve data by obtaining current `state`, or Change its `state` by sending and `action` with `dispatch`. `connect` maps the `store` `state` and `dispatch` to the `props` of a `component`.

```tsx
import {connect} from 'react-redux'

const MyComponent = (props) => (
    <div>
        <span onClick={onClick}>{props.text}</span>
    </div>
)

const mapStateToProps = state => ({
    text: state.content
})

const doClick = () => ({
    type: 'DO_ACTION',
    payload: {}
})

const mapDispatchToProps = dispatch => ({
    onClick: ()=> dispatch(doClick())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

## Setup express + ES6
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