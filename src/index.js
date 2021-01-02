import React from 'react'
import { QFontDatabase } from '@nodegui/nodegui'
import { Renderer } from '@nodegui/react-nodegui'
import App from './App'

import FontRobotoRegular from '../assets/fonts/Roboto/Roboto-Regular.ttf'
import FontRobotoMedium from '../assets/fonts/Roboto/Roboto-Medium.ttf'
import FontRobotoBold from '../assets/fonts/Roboto/Roboto-Bold.ttf'
import FontRobotoItalic from '../assets/fonts/Roboto/Roboto-Italic.ttf'

import FontMDIcons from '../assets/fonts/Material-Design-Iconic-Font.ttf'
import FontCryptoFont from '../assets/fonts/cryptofont.ttf'

const fonts = [
  FontRobotoRegular,
  FontRobotoMedium,
  FontRobotoBold,
  FontRobotoItalic,
  FontMDIcons,
  FontCryptoFont,
]

fonts.forEach((font) => QFontDatabase.addApplicationFont(font))
Renderer.render(<App />)
