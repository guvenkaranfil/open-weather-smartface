import ContentInsetAdjustment from "@smartface/native/ui/ios/contentinsetadjustment";

export interface SessionState {
    city: string
}


export namespace Constants {
    export const UPDATE_CITY = 'UPDATE_CITY';
}

declare namespace Actions {
    export interface SetCity {
        type: typeof Constants.UPDATE_CITY
        payload: { city: string }
    }
}

export type ActionTypes = Actions.SetCity