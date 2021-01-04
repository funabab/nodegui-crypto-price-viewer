import React, { useContext } from 'react'
import { View, Text, ScrollArea } from '@nodegui/react-nodegui'
import AssetItem from './AssetItem'
import { APIContext } from '../../context/api'

function AssetList() {
  const { assets, removeAsset } = useContext(APIContext)

  if (assets.length < 1) {
    return (
      <View styleSheet={styleSheet} id="assets">
        <Text
          style={`
            font-family: Roboto;
            font-size: 20px;
            align-self: "center";
            qproperty-alignment: AlignCenter;
            flex: 1;
            text-transform: uppercase;
            color: #1F1F1F;
        `}
        >
          No asset added
        </Text>
      </View>
    )
  }

  return (
    <ScrollArea styleSheet={styleSheet} id="assets">
      <View>
        {assets.map((asset, index) => (
          <AssetItem key={index} asset={asset} onRemove={removeAsset} />
        ))}
      </View>
    </ScrollArea>
  )
}

const styleSheet = `
    #assets {
        flex: 1;
        background-color: #F2F2F2;
        display: flex;
        border: 0px;
        padding: 20px;
    }
`

export default AssetList
