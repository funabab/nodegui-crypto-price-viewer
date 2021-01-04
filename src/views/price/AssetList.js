import React, { useContext } from 'react'
import { View, Text, ScrollArea } from '@nodegui/react-nodegui'
import AssetItem from './AssetItem'
import { APIContext } from '../../contexts/api'
import { useTheme } from '../../hooks/useTheme'

function AssetList() {
  const { assets, removeAsset } = useContext(APIContext)
  const styleSheet = useTheme(themeStyleSheet)

  if (assets.length < 1) {
    return (
      <View styleSheet={styleSheet} id="assets">
        <Text id="no-asset-added">No asset added</Text>
      </View>
    )
  }

  return (
    <ScrollArea styleSheet={styleSheet} id="assets">
      <View id="content-wrapper">
        {assets.map((asset, index) => (
          <AssetItem key={index} asset={asset} onRemove={removeAsset} />
        ))}
      </View>
    </ScrollArea>
  )
}

const themeStyleSheet = (isLightTheme) => `
    #assets {
        flex: 1;
        background-color: ${isLightTheme ? '#F2F2F2' : '#3D3D3D'};
        display: flex;
        border: 0px;
        padding: 20px;
    }

    #content-wrapper {
      display: flex;
      flex-direction: column;
      background-color: ${isLightTheme ? '#F2F2F2' : '#3D3D3D'};
    }

    #no-asset-added {
      font-family: Roboto;
      font-size: 20px;
      align-self: "center";
      qproperty-alignment: AlignCenter;
      flex: 1;
      text-transform: uppercase;
      color: ${isLightTheme ? '#1F1F1F' : '#CCCCCC'};
    }
`

export default AssetList
