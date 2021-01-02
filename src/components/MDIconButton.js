import React from 'react'
import { Button } from '@nodegui/react-nodegui'
import MDCodes from '../../assets/fonts/md-font-codes.json'

const style = `
  font-family: Material-Design-Iconic-Font;
`

function MDIconButton({ icon, ...props }) {
  const codeValue =
    icon in MDCodes ? String.fromCharCode(parseInt('0x' + MDCodes[icon])) : '?'
  return (
    <Button style={style} {...props}>
      {codeValue}
    </Button>
  )
}

export default MDIconButton
