import React from 'react'
import { Text } from '@nodegui/react-nodegui'
import PriceView from './price'
import ConnectionErrorView from './error'

function View() {
  // const style = `
  //       qproperty-alignment: AlignCenter;
  //   `
  // return <Text style={style}>It Worked!</Text>

  return <PriceView />
  // return <ConnectionErrorView />
}

export default View
