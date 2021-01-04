import React, { createContext, useEffect, useState } from 'react'

const context = createContext(null)
const CONFIG_THEME_MODE = 'theme_mode'
const DEFAULT_THEME_MODE = 'light'

export function ThemeProvider({ appConfig, children }) {
  const [themeMode, setThemeMode] = useState(
    () => appConfig.get(CONFIG_THEME_MODE) || DEFAULT_THEME_MODE
  )

  useEffect(() => {
    appConfig.set(CONFIG_THEME_MODE, themeMode)
  }, [themeMode])

  return (
    <context.Provider
      value={{
        themeMode,
        isLight: themeMode === 'light',
        isDark: themeMode !== 'light',
        setThemeMode: (isLight) => {
          setThemeMode(isLight ? 'light' : 'dark')
        },
      }}
    >
      {children}
    </context.Provider>
  )
}

export const ThemeContext = context
