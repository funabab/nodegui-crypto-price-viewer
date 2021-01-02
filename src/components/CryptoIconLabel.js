import React from 'react'
import { Text, View } from '@nodegui/react-nodegui'
import CryptoIconCodes from '../../assets/fonts/crypto-font-codes.json'

const style = `
  font-family: cryptofont;
  qproperty-alignment: AlignCenter;
`

function CryptoIconLabel({ icon, id, ...props }) {
  const codeValue =
    icon && icon in CryptoIconCodes ? CryptoIconCodes[icon] : '?'

  return (
    // Wierd bug!!! icons doesn't work if [id] is destructed as prop on Text component;
    // BAD FIX: i had to place the [id] in a wrapper View component
    <View id={id}>
      <Text style={style} {...props}>
        {codeValue}
      </Text>
    </View>
  )
}

CryptoIconLabel.defaultProps = {
  id: '',
}

export default CryptoIconLabel
