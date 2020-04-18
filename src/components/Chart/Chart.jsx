import React, {useEffect, useState} from "react";
import {fetchDailyDate} from "../../api";
import {Line, Bar} from "react-chartjs-2";

import styles from "./Chart.module.css"

const Chart = ({data: { confirmed, recovered, deaths }, country}) => {
    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyDate())
        }
        fetchAPI()
    }, [setDailyData])

    const lineChart = (
        dailyData.length ?
            <Line
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        // label: "Infected",
                        label: "Зараженных",
                        borderColor: "#3333ff",
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        fill: true,
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        // label: "Deaths",
                        label: "Летальных",
                        borderColor: "#ff1c1c",
                        backgroundColor: 'rgba(255, 0, 0, 0.3)',
                        fill: true,
                    }]
                }}
            /> : "Loading..."
    )
    const barChart = (
        confirmed
            ? (<Bar
                data={{
                    labels: ['Зараженных', 'Выздоровевших', 'Погибших'],
                    datasets: [{
                        label: "Людей",
                        backgroundColor: [
                            "rgba(255,0,255,.6)",
                            "rgba(0,255,0,.6)",
                            "rgba(255,0,0,.6)"
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text:`Число случаев в ${country}`}
                }}
            />)
            : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart