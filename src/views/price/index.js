import React from 'react'
import { View, Text, Button, LineEdit } from '@nodegui/react-nodegui'
import { colorHover, colorPressed } from '../../utils'
import MDIconButton from '../../components/MDIconButton'
import CryptoIconLabel from '../../components/CryptoIconLabel'

function PriceView() {
  return (
    <View id="price-view" styleSheet={styleSheet}>
      <View id="header">
        <View id="header-left">
          <Text>Currency:</Text>
          <View id="currency-list">
            <Button style="color: #00D1D1; font-weight: bold;" flat={true}>
              USD
            </Button>
            <Button flat={true}>EUR</Button>
            <Button flat={true}>JPY</Button>
            <Button flat={true}>NGN</Button>
          </View>
        </View>
        <View id="header-right">
          <Text id="connection-status">In Sync</Text>
          <MDIconButton icon="brightness-2" flat={true} />
        </View>
      </View>
      <LineEdit placeholderText="TYPE NEW ASSET TO ADD..."></LineEdit>
      {false && <Text id="status-text">Loading...</Text>}
      <View id="assets">
        <View id="btc">
          <View id="asset-left">
            <MDIconButton icon="delete" id="action-btn" />
            <CryptoIconLabel icon="btc" id="asset-icon" />
            <View>
              <Text id="asset-name-full">Bitcoin</Text>
              <Text id="asset-name-short">BTC</Text>
            </View>
          </View>
          <View id="asset-right">
            <View id="asset-price">
              <Text id="price-change">-1.4%</Text>
              <Text id="price-currency">$</Text>
              <Text id="price-value">20,0000</Text>
            </View>
            <View id="asset-market">
              <View>
                <Text id="market-data">Market Cap:</Text>
                <Text id="market-value">$440,353,650573</Text>
              </View>
              <View>
                <Text id="market-data">24HR HIGH/LOW:</Text>
                <Text id="market-value">$22,852.83 / $23,739.85</Text>
              </View>
            </View>
          </View>
        </View>
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

    #header-left, #header-right, #currency-list {
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

    #currency-list QPushButton {
        color: #CCCCCC;
        border: 0px;
        font-size: 20px;
        font-family: Roboto;
        margin-right: 5px;
        text-transform: uppercase;
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

    #btc {
        display: flex;
        flex-direction: row;
        justify-content: "space-between";
        align-items: "center";
        padding: 20px;
        padding-bottom: 30px;
        padding-top: 30px;
        border-bottom: 2px solid #DEDEDE;
    }

    #asset-left {
        display: flex;
        flex-direction: row;
        align-items: "center";
        justify-content: "space-between";
        width: 320px;
    }

    #action-btn QPushButton {
        border: 2px solid #666666;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        font-size: 28px;
        color: #F2F2F2;
    }

    #action-btn QPushButton:hover {
      background-color: ${colorHover('#F2F2F2')};
      color: #666666;
    }

    #action-btn QPushButton:pressed {
      background-color: ${colorPressed('#F2F2F2')};
      color: #666666;
    }

    #asset-icon QLabel {
        font-size: 90px;
        height: 110px;
        width: 110px;
        color: #00CCCC;
        border-color: #00CCCC;
        border-radius: 55px;
        border: 1px solid #00CCCC;
    }

    #asset-name-full {
        font-size: 35px;
        font-weight: 500;
        font-family: Roboto;
        text-transform: uppercase;
        color: #000000;
    }

    #asset-name-short {
        font-size: 25px;
        font-family: Roboto;
        text-transform: uppercase;
        color: #007070;
        margin-left: 2px;
    }

    #asset-price {
      display: flex;
      flex-direction: row;
      align-items: "center";
    }

    #price-value {
      color: #000000;
      font-family: Roboto;
      font-weight: 500;
      font-size: 44px;
    }

    #price-currency {
      color: #000000;
      font-size: 30px;
      margin-left: 1px;
      margin-right: 1px;
    }

    #price-change {
      color: #990000;
      font-size: 18px;
      font-family: Roboto;
    }

    #asset-market {
      margin-top: 4px;
    }

    #asset-market > QWidget {
      display: flex;
      flex-direction: row;
    }

    #market-data, #market-value {
      font-family: Roboto;
      font-size: 13px;
      text-transform: uppercase;
    }

    #market-data {
      color: #00A8A8;
      margin-right: 1px;
    }

    #market-value {
      color: #1F1F1F;
    }

`

export default PriceView
