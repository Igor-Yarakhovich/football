import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {Cards} from "../components/Cards/Cards";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {dataType, fetchCalendarTC, updateCalendarTC} from "../components/Cards/CardsReducer";
import {Preloader} from "../assets/Preloader/Preloader";
import SuperButton from "../components/superButton/SuperButton";
import SuperInputText from "../components/superInputText/SuperInputText";

function App() {
    const dispatch = useDispatch()
    const [offset, setOffset] = useState(1)
    const [searchValue, setSearchValue] = useState("")

    const data = useSelector<AppRootStateType, null | dataType>(state => state.tableTournament.dataCalendar)

    useEffect(() => {
        dispatch(fetchCalendarTC())
    }, [dispatch])



    const onclickHandler = () => {
        dispatch(updateCalendarTC(offset))
        setOffset(offset + 1)
    }

    const filteredItems = useMemo(() => {
        if (!data) return [];

        return data.items.filter((el) =>
        el.teamHome.name?.toLowerCase().includes(searchValue.toLowerCase())
        || el.teamAway.name?.toLowerCase().includes(searchValue.toLowerCase()))
    }, [searchValue, data])

    if (!data) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <h1 className='title'>football tournament calendar</h1>

            <SuperInputText
                type="text"
                required
                onChangeText={setSearchValue}
                placeholder='Search...'
                name={"Search"}
            />

            <div className='CardsContainer'>
                {
                    // Здесь использую индекс, так как у элементов дублируются id
                    filteredItems.map((el, index) => {
                        return <Cards card={el} key={index}/>
                    })
                }
            </div>
            <SuperButton onClick={onclickHandler}>Загрузить ещё</SuperButton>
        </div>
    );
}

export default App;
