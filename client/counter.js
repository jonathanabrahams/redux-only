import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from './components/DevTools';

const logger = store => next => action => {
    console.group(action.type);
    console.log("LOG:ACTION",action);
    action = {...action, before: 'before'};
    let result = next(action);
    result = {...result, after: 'after' };
    console.log("LOG:RESULT", result);
    console.groupEnd(action.type);
    return result;
}

const enhancer = compose(
    // Middleware for development
    applyMiddleware(logger),
    //Required!
    DevTools.instrument()
)

//Reducers
function counter(state = { value: 0 }, action) {
    console.log('REDUCE',action);
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
let store = createStore(counter, {value:0}, enhancer);

//Subscriber
store.subscribe(() => console.log("SUBSCRIBE", store.getState()));

// Dispatch action
store.dispatch(doIncrement());
store.dispatch(doIncrement());
store.dispatch(doDecrement());

export default store;