const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
const ADD_TIME = 'ADD_TIME'

const initialState = {
    isAuthenticated: false, 
    user: null, 
    timeLog: [],
    name: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOGGED_IN: 
            return {...state, isAuthenticated: true, user: action.payload}
        case USER_LOGGED_OUT:
            return {...state, isAuthenticated: false, user: null}
        case ADD_TIME:
            return {...state, timeLog: action.payload}

        default: 
            return state;

    }
}

export function userLoggedIn(user) {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}
export function userLoggedOut() {
    return {
        type: USER_LOGGED_OUT
    }
}
export function addTime(time) {
    return {
        type: ADD_TIME,
        payload: time
    }
}