import React from 'react';
import { connect } from 'react-redux';

const MyComponent = (props) => (
    <div>
        <h1>MyComponent</h1>
        <span>Value={props.text}</span><br/>
        <button onClick={props.onINC}>INC</button>&nbsp;-&nbsp;
        <button onClick={props.onDEC}>DEC</button>
    </div>
)

const mapStateToeProps = state => ({
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
    mapStateToeProps,
    mapDispatchToProps
)(MyComponent);