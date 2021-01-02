import React, { useEffect, useRef, useState } from 'react'
import { View, Text, LineEdit } from '@nodegui/react-nodegui'
import { colorHover, colorPressed } from '../../utils'
import MDIconButton from '../../components/MDIconButton'
import CurrencyList, { getCurrencySymbol } from './CurrencyList'
import AssetItem from './AssetItem'

function PriceView() {
  const viewRef = useRef(null)
  const [priceCurrency, setPriceCurrency] = useState('ngn')
  const currencySymbol = getCurrencySymbol(priceCurrency)

  // FUTURE FIX: currently this solve issue of widgets getting out of place (not updating) during re-render
  useEffect(() => {
    if (viewRef.current !== null) {
      viewRef.current.layout.update()
    }
  })

  return (
    <View ref={viewRef} id="price-view" styleSheet={styleSheet}>
      <View id="header">
        <View id="header-left">
          <Text>Currency:</Text>

          <CurrencyList
            selectedCurrency={priceCurrency}
            onCurrencySelected={(selectedCurrency) => {
              setPriceCurrency(selectedCurrency)
            }}
          />
        </View>
        <View id="header-right">
          <Text id="connection-status">In Sync</Text>
          <MDIconButton icon="brightness-2" flat={true} />
        </View>
      </View>
      <LineEdit placeholderText="TYPE NEW ASSET TO ADD..."></LineEdit>
      {false && <Text id="status-text">Loading...</Text>}
      <View id="assets">
        <AssetItem
          asset={{
            name: 'Bitcoin',
            symbol: 'btc',
            price: '20,0000',
            change: '-1.4',
            market: {
              marketCap: '440,353,650573',
              marketHigh: '22,852.83',
              marketLow: '23,739.85',
            },
          }}
          currencySymbol={currencySymbol}
        />
      </View>
      <View id="footer">
        <Text>POWERED BY: coingecko.com</Text>
      </View>
    </View>
  )
}

const styleSheet = `
    #price-view {
        display: flex;
    }

    #header {
        background-color: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: "center";
        justify-content: "space-between";
    }

    #header-left, #header-right {
        display: flex;
        flex-direction: row;
    }

    #header-left > QLabel {
        font-family: Roboto;
        font-size: 15px;
        font-weight: bold;
        text-transform: uppercase;
        margin-left: 15px;
        margin-right: 7px;
        color: #666666;
    }

    #connection-status {
        color: #1A661D;
        font-family: Roboto;
        font-size: 10px;
        font-style: italic;   
        text-transform: uppercase;
        margin-right: 5px;
    }
    

    #header-right QPushButton {
        width: 42px;
        height: 42px;
        background-color: #E5E5E5;
        font-size: 18px;
        color: #000000;
        border: 0px;
        border-radius: 0px;
    }

    #header-right QPushButton:hover {
        background-color: ${colorHover('#E5E5E5')};
    }

    #header-right QPushButton:pressed {
        background-color: ${colorPressed('#E5E5E5')};
    }

    QLineEdit {
        background-color: #D4D4D4;
        border: 0px;
        border-radius: 0px;
        font-size: 25px;
        height: 55px;
        padding-left: 50px;
        text-transform: uppercase;
    }

    #status-text {
        qproperty-alignment: AlignCenter;
        color: #666666;
        font-size: 13px;
        font-family: Roboto;
        padding: 4px;
    }

    #assets {
        flex: 1;
        background-color: #F2F2F2;
        padding: 20px;
    }

    #footer {
        font-size: 10px;
        font-family: Roboto;
        color: #363636;
        background-color: #E8E8E8;
        padding: 10px;
        padding-left: 20px;
    }

    

`

export default PriceView
