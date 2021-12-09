import { Constants, ActionTypes, SessionState } from ".";

export default class Actions {
    static updateCity(city: string): ActionTypes {
        return {
            type: Constants.UPDATE_CITY,
            payload: { city }
        }
    }
}

