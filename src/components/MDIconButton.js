import React from 'react'
import { Button, View } from '@nodegui/react-nodegui'
import MDCodes from '../../assets/fonts/md-font-codes.json'

const style = `
  font-family: Material-Design-Iconic-Font;
`

function MDIconButton({ icon, id, ...props }) {
  const codeValue = icon && icon in MDCodes ? MDCodes[icon] : '?'

  return (
    // Wierd bug!!! icons doesn't work if [id] is destructed as prop on Button component;
    // BAD FIX: i had to place the [id] in a wrapper View component
    <View id={id}>
      <Button style={style} {...props}>
        {codeValue}
      </Button>
    </View>
  )
}

MDIconButton.defaultProps = {
  id: '',
}

export default MDIconButton
