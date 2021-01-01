import React from 'react'
import { Window } from '@nodegui/react-nodegui'
import View from './views'

const windowSize = { width: 779, height: 624 }

function App() {
  return (
    <Window
      minSize={windowSize}
      maxSize={windowSize}
      windowTitle="It Worked!"
      style="background-color: #F3F3F3; text-align: center;"
    >
      <View />
    </Window>
  )
}

export default App
