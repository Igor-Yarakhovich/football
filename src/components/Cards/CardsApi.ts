import axios from "axios";
import {dataType} from "./CardsReducer";

export const instance = axios.create({
    baseURL: 'https://footballista.ru/api/',
    headers: {
        'Access-Control-Allow-Credentials': 'true'
    }
})

export const cardsApi = {
    getTableTournament(offset?: number) {
        return instance.get<dataType>(`seasons/5099/calendar_paginated?limit=10&offset=${offset ? offset : 0}`, {})
    },
    getLogo(logo: string, logoId: number) {
        return instance.get(`img/logos/${logo}-middle.png?logoId=${logoId}`, {})
    }
}
