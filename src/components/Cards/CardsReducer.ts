import {Dispatch} from "redux";
import {cardsApi} from "./CardsApi";


const initialState = {
    status: 'loading' as RequestStatusType,
    dataCalendar: null as null | dataType,
    searchValue: ''
};


export const cardsReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'cards/FETCH_CALENDAR':
            return {...state, dataCalendar: action.dataCalendar}
        case 'cards/UPDATE_CALENDAR':
            return {
                ...state, dataCalendar: {
                    items: [...state.dataCalendar!.items, ...action.dataCalendar.items],
                    total: action.dataCalendar.total
                }
            }
        case 'cards/SET-STATUS':
            return {...state, status: action.status}

        default: {
            return state
        }
    }
}

// actions
export const setCalendarAC = (dataCalendar: dataType) =>
    ({type: 'cards/FETCH_CALENDAR', dataCalendar} as const)

export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'cards/SET-STATUS', status} as const)

export const updateCalendarAC = (dataCalendar: dataType) =>
    ({type: 'cards/UPDATE_CALENDAR', dataCalendar} as const)


// thunks
export const fetchCalendarTC = (offset?: number) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        let data = await cardsApi.getTableTournament(offset)
        dispatch(setCalendarAC(data.data))
    } catch (err){
        console.log(err)
    } finally {
        dispatch(setStatusAC('succeeded'))
    }
}

export const fetchLogoTC = (logo: string, logoId: number) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        let data = await cardsApi.getLogo(logo, logoId)
    } catch (err){
        console.log(err)
    } finally {
        dispatch(setStatusAC('succeeded'))
    }
}

export const updateCalendarTC = (offset?: number) => async (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    try {
        let data = await cardsApi.getTableTournament(offset)
        dispatch(updateCalendarAC(data.data))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setStatusAC('succeeded'))
    }

}

// types
type InitialStateType = typeof initialState;

type ActionType = ReturnType<typeof setCalendarAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof updateCalendarAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded'

export type dataType = {
    items: Array<CardType>
    total: number
}

export type CardType = {
    awayLineupMarked: boolean
    champ: { _id: number, name: string, show: boolean, sortIdx: number, country_id: number }
    date: string
    homeLineupMarked: boolean
    league: { _id: number, name: string, sports: string, show: boolean, sortIdx: number }
    netPosition: null
    partsScoreAway: "{}"
    partsScoreHome: "{}"
    pitch: { _id: number, name: string, photoId: number, stadium_id: number }
    scoreFtAway: number
    scoreFtHome: number
    scorePenAway: null
    scorePenHome: null
    season: { _id: number, name: string, show: boolean, inProgress: boolean, sortIdx: number }
    stadium: { _id: number, name: string, photoId: number, league_id: number } | undefined
    stage: { _id: number, name: string, format: string, sortIdx: number, show: boolean }
    stateCode: number
    teamAway: { _id: number, name: string | null, shortName: string, logo: string, logoId: number }
    teamHome: { _id: number, name: string | null, shortName: string, logo: string, logoId: number }
    techDefeat: boolean
    tourNumber: number
    _id: number
}