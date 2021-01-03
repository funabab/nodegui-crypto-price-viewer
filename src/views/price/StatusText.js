import React from 'react'
import { Text } from '@nodegui/react-nodegui'

function StatusText() {
  return null
  return <Text style={style}>Loading...</Text>
}

const style = `
    qproperty-alignment: AlignCenter;
    color: #666666;
    font-size: 13px;
    font-family: Roboto;
    padding: 4px;
`

export default StatusText
