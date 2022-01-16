import React from "react";
import {CardType} from "./CardsReducer";
import styles from './Cards.module.css'

type CardsPropsType = {
    card: CardType
}

export const Cards = React.memo(({card}: CardsPropsType) => {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchLogoTC(props.card.teamAway.logo, props.card.teamAway.logoId))
    // }, [dispatch])

    return (<div>
        {/*/!*<img src={image} />*!/*/}
        <table className={styles.cardTable} key={card._id}>
            <tbody>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Номер тура</span>
                </th>
                <td>{card.tourNumber}</td>
            </tr>

            <tr>
                <th>
                    <span className={styles.spanHeader}>Команда хозяев</span>
                </th>
                <td>{card.teamHome.name}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Логотип хозяев</span>
                </th>
                <td>лого</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Команда гостей</span>
                </th>
                <td>{card.teamAway.name}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Логотип гостей</span>
                </th>
                <td>лого</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Счёт гостей</span>
                </th>
                <td>{card.scoreFtAway}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Счёт хозяев</span>
                </th>
                <td>{card.scoreFtHome}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Дата матча</span>
                </th>
                <td>{card.date}</td>
            </tr>
            <tr>
                <th>
                    <span className={styles.spanHeader}>Название стадиона</span>
                </th>
                <td>{card.stadium?.name}</td>

            </tr>
            </tbody>
        </table>
    </div>)

})