import { SessionState, Constants, ActionTypes } from '.';

const initialState: SessionState = {
    city: ''
}

export default function (state = initialState, action: ActionTypes): SessionState {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.UPDATE_CITY: {
            newState.city = action.payload.city
            break;
        }
        default: {
            break;
        }
    }
    return newState;
}