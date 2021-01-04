import React from 'react'
import { View, Text } from '@nodegui/react-nodegui'
import MDIconButton from '../../components/MDIconButton'
import CryptoIconLabel from '../../components/CryptoIconLabel'
import PropTypes from 'prop-types'
import { colorHover, colorPressed } from '../../utils'

function AssetItem({
  asset: { id, name, symbol, price, change, market },
  onRemove,
}) {
  const currencySymbol = price[0]
  const priceValue = price.substr(1)

  return (
    <View id="asset" styleSheet={styleSheet}>
      <View id="asset-left">
        <MDIconButton
          icon="delete"
          id="action-btn"
          on={{
            clicked: () => onRemove(id),
          }}
        />
        <View style="padding-left: 20px; padding-right: 20px">
          <CryptoIconLabel icon={symbol.toLowerCase()} id="asset-icon" />
        </View>
        <View style="display: flex; flex-direction: column">
          <Text id="asset-name-full">{name}</Text>
          <Text id="asset-name-short">{symbol}</Text>
        </View>
      </View>
      <View id="asset-right">
        <View id="asset-price">
          <Text id="price-change" style={change <= 0 ? 'color: #990000;' : ''}>
            {change}%
          </Text>
          <Text id="price-currency">{currencySymbol}</Text>
          <Text id="price-value">{priceValue}</Text>
        </View>
        <View id="asset-market">
          <View>
            <Text id="market-data">Market Cap:</Text>
            <Text id="market-value">{market.marketCap}</Text>
          </View>
          <View>
            <Text id="market-data">24HR HIGH/LOW:</Text>
            <Text id="market-value">
              {market.marketHigh} / {market.marketLow}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

AssetItem.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    change: PropTypes.number.isRequired,
    market: PropTypes.shape({
      marketCap: PropTypes.string.isRequired,
      marketHigh: PropTypes.string.isRequired,
      marketLow: PropTypes.string.isRequired,
    }),
  }),
  onRemove: PropTypes.func.isRequired,
}

const styleSheet = `
    #asset {
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

    #asset-right {
      display: flex;
      flex-direction: column;
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
        color: #009900;
        font-size: 18px;
        font-family: Roboto;
    }

    #asset-market {
        margin-top: 4px;
        display: flex;
        flex-direction: column;
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

export default AssetItem
