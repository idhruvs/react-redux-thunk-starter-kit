// Constants
export const REPOFETCH_HAS_ERRORED = 'repositories/REPOFETCH_HAS_ERRORED';
export const REPOFETCH_IS_LOADING = 'reposities/REPOFETCH_IS_LOADING';
export const REPOFETCH_SUCCESS = 'repositories/REPOFETCH_SUCCESS';

const initialState = {
    isLoading: false,
    isErrored: false,
    list: [],
    userInfo: {}
}

// Reducer (reducer.js)
export default (state = initialState, action) =>{
    switch( action.type ) {
        case REPOFETCH_HAS_ERRORED:
            return {
                ...state,
                isErrored: true
            }
        case REPOFETCH_IS_LOADING: 
            return {
                ...state, 
                isLoading: true
            }
        case REPOFETCH_SUCCESS:
            console.log(action.response.info);
            return {
                ...state, 
                list: action.response.list,
                userInfo: action.response.info,
                isLoading: false
            }
        default: 
            return state;
    }
}


export const fetchRepositories = (username) => {
    return async ( dispatch ) => {
        dispatch(repoisLoading(true));
        try {
            console.log(username);
            const url = `https://api.github.com/users/${username}/repos?sort=updated`;
            const infoUrl = `https://api.github.com/users/${username}`;
            
            const info = await fetch(infoUrl);
            if(info.status === 200){
                const infoResponse = await info.json();
                const response = await fetch(url);
                const responseBody = await response.json();
                dispatch( repofetch_success( {list: responseBody, info: infoResponse} ) );
            }
            else {
                dispatch( repofetch_error(true));
            }
            
        } catch( error ) {
            console.log(error);
            dispatch(repofetch_error(true));
        }
    }
}

// Actions ( actions.js)
export function repofetch_success( response ) {
    console.log('success');
    return {
        type: REPOFETCH_SUCCESS,
        response
    };
}

export function repoisLoading ( bool ) {
    return {
        type: REPOFETCH_IS_LOADING,
        isLoading: bool
    }
}

export function repofetch_error (bool){
    return {
        type: REPOFETCH_HAS_ERRORED,
        isErrored: bool
    };
}