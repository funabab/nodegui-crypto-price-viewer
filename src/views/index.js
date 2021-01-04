import React, { useContext } from 'react'
import { View as ViewWidget, Image } from '@nodegui/react-nodegui'
import PriceView from './price'
import ConnectionErrorView from './error'
import { APIContext } from '../contexts/api'
import IconImage from '../../assets/images/icon.png'
import { useTheme } from '../hooks/useTheme'

function View() {
  const { apiState, requestState } = useContext(APIContext)
  const style = useTheme(loadingStyleSheet)

  if (
    apiState === 'not-loaded' ||
    (apiState === 'loaded' && requestState === 'initial')
  ) {
    return (
      <ViewWidget styleSheet={style} id="loading-view">
        <Image src={IconImage} size={{ width: 150, height: 150 }} />
      </ViewWidget>
    )
  } else if (apiState === 'error') {
    return <ConnectionErrorView />
  } else {
    return <PriceView />
  }
}

const loadingStyleSheet = (isLightTheme) => `
  #loading-view {
    display: flex;
    justify-content: "center";
    align-items: "center";
    background-color: ${isLightTheme ? '#F2F2F2' : '#3D3D3D'};
  }

  #loading-view QLabel {
    width: 150px;
    height: 150px;
  }
`

export default View
