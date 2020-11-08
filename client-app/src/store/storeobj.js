import md5 from "md5";
import reducer from "./bugs";

function createStore(reducer) {
  let state = [];
  let subscribers = {};

  const getState = () => state;
  const subscribe = (func) => {
    const key = md5(func);
    if (!subscribers[key]) subscribers[key] = func;
    return function () {
      delete subscribers[key];
    };
  }
  const dispatch = (action) => {
    state = reducer(state, action);
    Object.keys(subscribers).map((subscriber) => subscribers[subscriber]());
  },

  return {
    getState,
    subscribe,
    dispatch
  };
}

export default createStore(reducer);
