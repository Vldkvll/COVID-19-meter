import React from 'react';
import { Cards, Chart, Country } from './components';
import {fetchData} from "./api";
import logo from '../src/assests/img/covid-logo.jpg'

import styles from './App.module.css';

class App extends React.Component {
    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData()
        this.setState({data: fetchedData})
    }
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country)
        this.setState({data: fetchedData, country})
    }

    render() {
        const { data, country }  = this.state
    return (
        <div className={styles.container}>
            <img src={logo} className={`${styles.logo}`} alt="COVID-19" />
            <Cards data={data}/>
            <Country handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country}/>
        </div>
    );
  }
}

export default App;
