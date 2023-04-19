import {createContext, useReducer} from 'react';

const initialState = { dispatch: () => any, color: 'black' };
const store = createContext(initialState);
const { Provider } = store;

console.log("Initialize global context");
console.log("color = " + initialState.color);

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'action description':
        console.log("State = " + state);
        const newState = state;
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }