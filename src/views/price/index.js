import React, { useEffect, useRef, useContext } from 'react'
import { View, Text } from '@nodegui/react-nodegui'
import { colorHover, colorPressed } from '../../utils'
import MDIconButton from '../../components/MDIconButton'
import CurrencyList from './CurrencyList'
import AssetList from './AssetList'
import { APIContext } from '../../contexts/api'
import AddAsset from './AddAsset'
import { ThemeContext } from '../../contexts/theme'
import { useTheme } from '../../hooks/useTheme'

const PRICE_REFRESH_DURATION = 1000 * 60

function PriceView() {
  const { requestState, refreshData } = useContext(APIContext)
  const { isLight: isLightTheme, setThemeMode } = useContext(ThemeContext)
  const styleSheet = useTheme(themeStyleSheet)
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
            style={requestState === 'out-of-sync' ? 'color: #FF6666;' : ''}
          >
            {requestState === 'out-of-sync' ? 'Out of Sync' : 'In Sync'}
          </Text>
          <MDIconButton
            icon={isLightTheme ? 'brightness-2' : 'brightness-7'}
            on={{
              clicked: () => setThemeMode(!isLightTheme),
            }}
            flat={true}
          />
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

const themeStyleSheet = (isLightTheme) => `
    #price-view {
        display: flex;
        flex-direction: column;
        background-color: ${isLightTheme ? '#FAFAFA' : '#666666'};
    }

    #header {
        background-color: ${isLightTheme ? '#FFFFFF' : '#666666'};
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
        color: ${isLightTheme ? '#666666' : '#FAFAFA'};
    }

    #connection-status {
        color: #66FF99;
        font-family: Roboto;
        font-size: 10px;
        font-style: italic;   
        text-transform: uppercase;
        margin-right: 5px;
    }
    

    #header-right QPushButton {
        width: 42px;
        height: 42px;
        background-color: ${isLightTheme ? '#E5E5E5' : '#8A8A8A'};
        font-size: 18px;
        color: ${isLightTheme ? '#000000' : '#FFFFFF'};
        border: 0px;
        border-radius: 0px;
    }

    #header-right QPushButton:hover {
        background-color: ${
          isLightTheme ? colorHover('#E5E5E5') : colorHover('#8A8A8A')
        };
    }

    #header-right QPushButton:pressed {
        background-color: ${
          isLightTheme ? colorPressed('#E5E5E5') : colorPressed('#8A8A8A')
        };
    }

    #footer {
        font-size: 10px;
        font-family: Roboto;
        background-color: ${isLightTheme ? '#E8E8E8' : '#303030'};
        padding: 10px;
        padding-left: 20px;
    }

    #footer QLabel {
      color: ${isLightTheme ? '#363636' : '#DEDEDE'};
    }

    

`

export default PriceView
