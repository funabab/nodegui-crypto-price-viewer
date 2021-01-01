import React from 'react'
import { Text } from '@nodegui/react-nodegui'

function View() {
  const style = `
        qproperty-alignment: AlignCenter;
    `
  return <Text style={style}>It Worked!</Text>
}

export default View
