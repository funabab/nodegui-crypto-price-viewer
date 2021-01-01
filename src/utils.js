import Color from 'color'
import color from 'color'

export function colorHover(color) {
  const c = Color(color)
  return c.isLight() ? c.darken(0.1).hex() : c.lightness(10).hex()
}

export function colorPressed(color) {
  const c = Color(color)
  return c.isLight() ? c.darken(0.2).hex() : c.lightness(20).hex()
}
