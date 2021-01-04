import React, { useEffect, useRef, useContext } from 'react'
import { View, Text } from '@nodegui/react-nodegui'
import { colorHover, colorPressed } from '../../utils'
import MDIconButton from '../../components/MDIconButton'
import CurrencyList from './CurrencyList'
import AssetList from './AssetList'
import { APIContext } from '../../context/api'
import AddAsset from './AddAsset'

const PRICE_REFRESH_DURATION = 1000 * 60

function PriceView() {
  const { apiState, refreshData } = useContext(APIContext)
  const viewRef = useRef(null)

  // FUTURE FIX: currently this solve issue of widgets getting out of place (not updating) during re-render
  useEffect(() => {
    if (viewRef.current !== null) {
      viewRef.current.layout.update()
    }

    const timerID = setInterval(() => refreshData(), PRICE_REFRESH_DURATION)
    return () => clearInterval(timerID)
  })

  return (
    <View ref={viewRef} id="price-view" styleSheet={styleSheet}>
      <View id="header">
        <View id="header-left">
          <Text>Currency:</Text>
          <CurrencyList />
        </View>
        <View id="header-right">
          <Text
            id="connection-status"
            style={apiState === 'out-of-sync' ? 'color: #CC1912' : ''}
          >
            {apiState === 'out-of-sync' ? 'Out of Sync' : 'In Sync'}
          </Text>
          <MDIconButton icon="brightness-2" flat={true} />
        </View>
      </View>
      <AddAsset />
      <AssetList />
      <View id="footer">
        <Text>POWERED BY: coingecko.com</Text>
      </View>
    </View>
  )
}

const styleSheet = `
    #price-view {
        display: flex;
        flex-direction: column;
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
