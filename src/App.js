import React from 'react'
import { Window } from '@nodegui/react-nodegui'
import View from './views'

const windowSize = { width: 779, height: 624 }

function App() {
  return (
    <Window
      minSize={windowSize}
      windowTitle="It Worked!"
      style="background-color: #FAFAFA; text-align: center;"
    >
      <View />
    </Window>
  )
}

export default App
