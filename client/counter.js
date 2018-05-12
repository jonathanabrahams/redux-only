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