/**
 * Random colors generator
 *----------------------------------------------------------------
 * @description generates random colors
 * @returns {string} The hexadecimal representation of the random color value.
 */

export function randomColorsGenerator(): string {
  // make sure no darkcolors are from so not going to far to zero

  return '#' + Math.floor(Math.random() * 16777215 + 60000).toString(16)
}
