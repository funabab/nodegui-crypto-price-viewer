import React from 'react'
import { QIcon } from '@nodegui/nodegui'
import { Window } from '@nodegui/react-nodegui'
import View from './views'
import { name as appName, displayName } from '../package.json'
import IconImage from '../assets/images/icon.png'
import { APIProvider } from './context/api'

const windowSize = { width: 779, height: 624 }
const icon = new QIcon(IconImage)

function App() {
  return (
    <Window
      minSize={windowSize}
      windowTitle={displayName}
      style="background-color: #FAFAFA; text-align: center;"
      windowIcon={icon}
    >
      <APIProvider>
        <View />
      </APIProvider>
    </Window>
  )
}

export default App
export const APP_NAME = appName
