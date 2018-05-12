export default (store = { message: "" }, action) => {
    console.log("NOTIFY", action.type);
    return store;
}