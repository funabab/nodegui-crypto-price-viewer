import React, { useContext, useReducer } from 'react'
import { LineEdit } from '@nodegui/react-nodegui'
import StatusText from './StatusText'
import { APIContext } from '../../contexts/api'
import { useTheme } from '../../hooks/useTheme'

function AddAsset() {
  const { addAsset } = useContext(APIContext)
  const style = useTheme(themeStyle)
  const [{ viewState, ...params }, dispatch] = useReducer(Reducer, {
    viewState: 'initial',
    input: '',
  })

  const handleTextChange = (text) => {
    dispatch({
      type: 'user-input',
      payload: text,
    })
  }

  const handleSubmit = async () => {
    const name = params.input.trim().toLowerCase()
    if (name) {
      try {
        dispatch({ type: 'adding-asset' })
        await addAsset(name)
        dispatch({ type: 'asset-added' })
      } catch (e) {
        dispatch({
          type: 'fetch-error',
          payload: e.message,
        })
      }
    }
  }

  return (
    <>
      <LineEdit
        placeholderText="TYPE NEW ASSET TO ADD..."
        style={style}
        enabled={viewState !== 'busy'}
        text={params.input}
        on={{
          textEdited: handleTextChange,
          returnPressed: handleSubmit,
        }}
      ></LineEdit>
      <StatusText state={viewState} error={params.error} />
    </>
  )
}

const Reducer = (state, { type, payload }) => {
  switch (type) {
    case 'user-input':
      return {
        ...state,
        viewState: 'initial',
        input: payload,
        error: '',
      }
    case 'fetch-error':
      return {
        ...state,
        viewState: 'error',
        error: payload,
      }
    case 'adding-asset':
      return {
        ...state,
        viewState: 'busy',
        error: '',
      }
    case 'asset-added':
      return {
        ...state,
        viewState: 'initial',
        input: '',
        error: '',
      }
    default:
      throw new Error()
  }
}

const themeStyle = (isLightTheme) => `
  background-color: ${isLightTheme ? '#D4D4D4' : '#424242'};
  border: 0px;
  border-radius: 0px;
  font-size: 25px;
  height: 55px;
  padding-left: 50px;
  text-transform: uppercase;
  color: ${isLightTheme ? '#1F1F1F' : '#919191'};
`

export default AddAsset
