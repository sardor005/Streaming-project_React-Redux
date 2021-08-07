const INIT_STATE = {
    isSignIn : null,
    userID: null
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case 'SIGN_IN': 
            return { ...state, isSignIn = true, userID = action.payload }
        case 'SIGN_OUT':
            return { ...state, isSignIn = false, userID = null }
        default:
            return state
    }
}