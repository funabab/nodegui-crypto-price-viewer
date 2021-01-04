import React, { useContext } from 'react'
import { View, Button } from '@nodegui/react-nodegui'
import { supportedCurrencies, APIContext } from '../../context/api'

function CurrencyList() {
  const { currency: selected, setCurrency } = useContext(APIContext)

  return (
    <View styleSheet={styleSheet} id="currency-list">
      {supportedCurrencies.map((currency, index) => (
        <Button
          style={
            currency === selected ? 'color: #00D1D1; font-weight: bold;' : ''
          }
          key={index}
          flat={true}
          on={{
            clicked: () => setCurrency(currency),
          }}
        >
          {currency.toUpperCase()}
        </Button>
      ))}
    </View>
  )
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
