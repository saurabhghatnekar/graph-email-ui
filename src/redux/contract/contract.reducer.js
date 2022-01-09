const INITIAL_STATE = {
    graphEmailContract: null
}

const graphContractReducer = (state=INITIAL_STATE, action) => {
    switch (action.type){
        case "SET_GRAPHEMAIL_CONTRACT":
            return {
                ...state,
                graphEmailContract: action.payload
            }
        default:
            return state
    }
}

export default graphContractReducer;