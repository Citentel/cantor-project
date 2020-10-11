import React, { Component } from 'react';
import Converter from './components/Converter';
import Loader from './components/Loader';
import "./static/css/app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : 'http://api.nbp.pl/api/exchangerates/tables/a',
            isLoading : true,
            json : []
        }
        
        this.getData();
    } 

    getConnect = async () => {
        let response = await fetch(this.state.url);
        if (!response.ok) {
            console.log(response.status);
            return false;
        }
        else {
            return response;
        }
    }

    getData = async () => {
        if (this.getConnect() !== false) {
            const json = await this.getConnect().then((response)=> response.json());

            this.setState({
                json : json,
                isLoading : false
            });
        }
    }

    render = () => {
        return(
            <div className="app">
                <div className="app__box">
                    <h1 className="app__box--h1">Kalkulator walutowy</h1>
                    { this.state.isLoading === true ? <Loader /> : <Converter data={this.state.json} /> }
                </div>
            </div>
        );
    }
}

export default App;
