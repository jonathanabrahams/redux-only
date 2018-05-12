export default function counter(state = { value: 0 }, action) {
    console.log('COUNTER', action.type);
    switch (action.type) {
        case 'INC':
            return { ...state, value: state.value + 1 };
        case 'DEC':
            return { ...state, value: state.value - 1 };
    }
    return state;
}