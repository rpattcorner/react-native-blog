import React, { useReducer } from 'react';

export default (reducer, actions ,initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlockPost: (dispatch) => return () => {} }
       // for each action, call with dispatch, get a function back and pass it to value prop 

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider }
};