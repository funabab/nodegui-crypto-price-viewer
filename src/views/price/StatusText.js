import React from 'react'
import { Text } from '@nodegui/react-nodegui'
import PropTypes from 'prop-types'

function StatusText({ state, error }) {
  const style = `
    qproperty-alignment: AlignCenter;
    color: ${state !== 'error' ? '#666666' : '#990000'};
    font-size: 13px;
    font-family: Roboto;
    padding: 4px;
`

  if (state === 'busy') {
    return <Text style={style}>Loading...</Text>
  } else if (state === 'error') {
    return <Text style={style}>{error}</Text>
  } else {
    return null
  }
}

StatusText.propTypes = {
  state: PropTypes.string.isRequired,
  error: PropTypes.string,
}

export default StatusText
