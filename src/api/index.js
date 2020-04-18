import axios from 'axios'

const url = "https://covid19.mathdro.id/api"

export const fetchData = async (country = null) => {
    let changeableUrl = url

    if (country && country !== 'global') {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl)
        return {confirmed, recovered, deaths, lastUpdate}
    } catch (error) {
        console.error('Something wrong in the fetch data from https://covid19.mathdro.id/api')
    }
}

export const fetchDailyDate = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData
    } catch (error) {
        console.error('Something wrong in the fetch data from https://covid19.mathdro.id/api/daily')
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)

        return countries.map((country) => country.name)

    } catch (error) {
        console.error('Something wrong in the fetch data from https://covid19.mathdro.id/api/daily')
    }
}