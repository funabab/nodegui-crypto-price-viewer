import React from 'react'
import { QIcon } from '@nodegui/nodegui'
import { Window } from '@nodegui/react-nodegui'
import View from './views'
import { name as appName, displayName } from '../package.json'
import IconImage from '../assets/images/icon.png'
import { APIProvider } from './contexts/api'
import ConfigStore from 'configstore'
import { ThemeProvider } from './contexts/theme'

const windowSize = { width: 779, height: 624 }
const icon = new QIcon(IconImage)
const appConfig = new ConfigStore(appName)

function App() {
  return (
    <Window
      minSize={windowSize}
      windowTitle={displayName}
      style="background-color: #FAFAFA; text-align: center;"
      windowIcon={icon}
    >
      <APIProvider appConfig={appConfig}>
        <ThemeProvider appConfig={appConfig}>
          <View />
        </ThemeProvider>
      </APIProvider>
    </Window>
  )
}

export default App
export const APP_NAME = appName
