import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollArea } from '@nodegui/react-nodegui'
import AssetItem from './AssetItem'
import PropTypes from 'prop-types'

function AssetList({ assets, currencySymbol }) {
  const viewRef = useRef(null)

  // FUTURE FIX: currently this solve issue of scroll children widgets getting out of place (not updating) during re-render
  useEffect(() => {
    if (viewRef.current != null && viewRef.current.layout) {
      viewRef.current.layout.update()
    }
  })

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
    <View styleSheet={styleSheet} id="assets">
      {
        <ScrollArea>
          <View ref={viewRef}>
            {assets.map((asset, index) => (
              <AssetItem
                key={index}
                asset={asset}
                currencySymbol={currencySymbol}
              />
            ))}
          </View>
        </ScrollArea>
      }
    </View>
  )
}

AssetList.propTypes = {
  assets: PropTypes.array,
  currencySymbol: PropTypes.string,
}

const styleSheet = `
    #assets {
        flex: 1;
        background-color: #F2F2F2;
        display: flex;
        padding: 20px;
    }

    #assets QScrollArea {
        flex: 1;
        border: 0px;
    }
`

export default AssetList
