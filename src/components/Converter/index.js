import React, { Component } from 'react';
import './static/css/index.css';

class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : this.props.data,
            rates : this.props.data[0].rates,
            form : {},
            wasClick : false,
            response : {}
        }

        this.state.rates.unshift({
            currency : 'polski złoty',
            code : 'PLN',
            mid : 1
        })

    }

    handleClick = () => {
        let form = {
            currency_1 : document.querySelector('#from__currency').value,
            currency_2 : document.querySelector('#to__currency').value
        }

        let dataForm = {
            amount : document.querySelector('#amount').value,
            currency_1 : this.getObjData(form.currency_1),
            currency_2 : this.getObjData(form.currency_2)
        }

        this.getResultValue(dataForm);

        this.setState({
            form : form,
            wasClick : true
        });
    }

    getObjData = (code) => {
        for (const key in this.state.rates) {
            if (this.state.rates[key].code === code) {
                return this.state.rates[key];
            }
        }
    }

    getResultValue = (data) => {
        let conversionRate = (data.currency_1.mid / data.currency_2.mid);
        conversionRate = this.roundNum(conversionRate, 4);
        
        this.setState({
            response : {
                amount : data.amount,
                conversionRate : conversionRate,
                result : data.amount * conversionRate
            }
        })
    }

    roundNum = (value, precision) => {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    createDate = () => {
        let date = this.state.data[0].effectiveDate.split('-');

        return <b>{ date[2] }.{ date[1] }.{ date[0] }</b>
    }

    render = () => {
        let options = [];
 
        this.state.rates.forEach((value, key) => {
            options.push(
            <option key={ key } value={ value.code }>{ value.code } - { value.currency }</option>
            )
        });

        return(
            <div className="converter">
                <div className="converter__form">
                    <div className="converter__form--box">
                        <div className="converter__form--box__item converter__form--box__amount">
                            <label htmlFor="amount">Kwota:</label>
                            <input type="number" name="amount" id="amount" min="0" defaultValue="100" placeholder="Wpisz kwotę"/>
                        </div>
                        <div className="converter__form--box__item converter__form--box__from--currency">
                            <label htmlFor="from__currency">Mam:</label>
                            <select name="from__currency" id="from__currency">
                                { options }
                            </select>
                        </div>
                        <div className="converter__form--box__item converter__form--box__to--currency">
                            <label htmlFor="to__currency">Chcę otrzymać:</label>
                            <select name="to__currency" id="to__currency">
                                { options }
                            </select>
                        </div>
                    </div>
                    <div className="converter__form--button">
                        <button className="converter__form--button__btn" onClick={ this.handleClick }>
                            Przelicz
                        </button>
                    </div>
                </div>
                <div className={ this.state.wasClick ? "converter__result active" :  "converter__result" }>
                    <h2 className="converter__result--h2">
                        { this.state.response.amount } { this.state.form.currency_1 } = { this.state.response.result } { this.state.form.currency_2 }
                    </h2>
                </div>
                <div className={ this.state.wasClick ? "converter__info active" :  "converter__info" }>
                    <p>1 { this.state.form.currency_1 } = { this.state.response.conversionRate } { this.state.form.currency_2 }, według średniego kursu NBP z dn. { this.createDate() }</p>
                </div>
            </div>
        );
    }
}

export default Converter;