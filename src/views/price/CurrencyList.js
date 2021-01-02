import React from 'react'
import { View, Button } from '@nodegui/react-nodegui'
import PropTypes from 'prop-types'

const supportedCurrencies = { USD: '$', EUR: '£', JPY: '¥', NGN: '₦' }

function CurrencyList({ selectedCurrency, onCurrencySelected }) {
  const selected =
    selectedCurrency && selectedCurrency.toUpperCase() in supportedCurrencies
      ? selectedCurrency.toUpperCase()
      : 'USD'

  return (
    <View styleSheet={styleSheet} id="currency-list">
      {Object.keys(supportedCurrencies).map((currency, index) => (
        <Button
          style={
            currency === selected ? 'color: #00D1D1; font-weight: bold;' : ''
          }
          key={index}
          flat={true}
          on={{
            clicked: () => onCurrencySelected(currency),
          }}
        >
          {currency}
        </Button>
      ))}
      {/* <Button style="color: #00D1D1; font-weight: bold;" flat={true}>
        USD
      </Button>
      <Button flat={true}>EUR</Button>
      <Button flat={true}>JPY</Button>
      <Button flat={true}>NGN</Button> */}
    </View>
  )
}

CurrencyList.propTypes = {
  selectedCurrency: PropTypes.string,
  onCurrencySelected: PropTypes.func,
}

const styleSheet = `
    #currency-list {
        display: flex;
        flex-direction: row;
    }

    #currency-list QPushButton {
        color: #CCCCCC;
        border: 0px;
        font-size: 20px;
        font-family: Roboto;
        margin-right: 5px;
        text-transform: uppercase;
    }
`

export default CurrencyList

export function getCurrencySymbol(currency) {
  return currency && currency.toUpperCase() in supportedCurrencies
    ? supportedCurrencies[currency.toUpperCase()]
    : '?'
}
