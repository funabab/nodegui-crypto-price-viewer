import React, { useContext } from 'react'
import { View as ViewWidget, Image } from '@nodegui/react-nodegui'
import PriceView from './price'
import ConnectionErrorView from './error'
import { APIContext } from '../context/api'
import IconImage from '../../assets/images/icon.png'

function View() {
  const { apiState } = useContext(APIContext)

  if (apiState === 'not-loaded') {
    return (
      <ViewWidget styleSheet={loadingStyleSheet} id="loading-view">
        <Image src={IconImage} size={{ width: 150, height: 150 }} />
      </ViewWidget>
    )
  } else if (apiState === 'error') {
    return <ConnectionErrorView />
  } else {
    return <PriceView />
  }
}

const loadingStyleSheet = `
  #loading-view {
    display: flex;
    justify-content: "center";
    align-items: "center";
  }

  #loading-view QLabel {
    width: 150px;
    height: 150px;
  }
`

export default View
