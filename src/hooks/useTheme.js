import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/theme'

export function useTheme(callback) {
  const { themeMode, isLight } = useContext(ThemeContext)
  const [style, setStyle] = useState('')

  useEffect(() => {
    setStyle(callback(isLight, themeMode))
  }, [themeMode])

  return style
}
