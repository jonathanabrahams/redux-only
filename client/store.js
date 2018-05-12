import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from './components/DevTools';
import reducer from './reducers'
import { doIncrement, doDecrement } from './actions/counter';
import logger from './middleware/logger'

const enhancer = compose(
    // Middleware for development
    applyMiddleware(logger),
    //Required!
    DevTools.instrument()
)

//Actions

//Store
let store = createStore(
    reducer, {
        counter: { value: 0 },
        notify: { message: "" }
    }, enhancer);

//Subscriber
store.subscribe(() => console.log("SUBSCRIBE", store.getState()));

// Dispatch action
store.dispatch(doIncrement());
store.dispatch(doIncrement());
store.dispatch(doDecrement());

export default store;