import React from 'react';
import { connect } from 'react-redux';
import { doIncrement, doDecrement } from '../actions/counter';

const MyComponent = (props) => (
    <div>
        <h1>MyComponent</h1>
        <span>Value={props.text}</span><br />
        <button onClick={props.onINC}>INC</button>&nbsp;-&nbsp;
        <button onClick={props.onDEC}>DEC</button>
    </div>
)

const mapStateToProps = state => ({
    text: state.counter.value
})

const mapDispatchToProps = dispatch => ({
    onINC: () => dispatch(doIncrement()),
    onDEC: () => dispatch(doDecrement())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponent);