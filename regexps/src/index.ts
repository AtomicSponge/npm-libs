/**
 * @author Matthew Evans
 * @module regexps
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

/**
 * Replaces newlines with another string
 * @param str String to perform replacement on
 * @param replace String to replace newlines with
 * @returns Modified string
 */
export const replaceNewlines = (str:string, replace:string):string => {
  return str.replace(/(?:\r\n|\r|\n)/g, replace)
}

/**
 * Regex that tests for valid hex color values
 * Will allow alpha channel
 * @param str String to test
 * @returns True if valid, else false
 */
export const testHexColor = (str:string):boolean => {
  return /^#[0-9a-f]{3,4}([0-9a-f]{3,4})?$/i.test(str)
}

/**
 * Regex that tests for rgb(a) or hsl(a) color values
 * @param str String to test
 * @returns True if valid, else false
 */
export const testRGB = (str:string):boolean => {
  return /^(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str)
}

/**
 * Test for valid pixel format (NNpx)
 * @param str String to test
 * @returns True if valid pixel format, else false
 */
export const testPixel = (str:string):boolean => {
  return /^([0-9]+)px$/i.test(str)
}

/**
 * Test for alphabetic charecters
 * @param str String to test
 * @returns True if the string is only alpha, else false
 */
export const testAlpha = (str:string):boolean => {
  return /^[A-Za-z]+$/g.test(str)
}

/**
 * Test for numeric charecters
 * @param str String to test
 * @returns True if the string is only numeric, else false
 */
export const testNumeric = (str:string):boolean => {
  return /^\d+$/g.test(str)
}

/**
 * Test for alphabetic and numeric charecters
 * @param str String to test
 * @returns True if the string is only alpha and numeric, else false
 */
export const testAlphaNumeric = (str:string):boolean => {
  return /^[a-zA-Z0-9]+$/g.test(str)
}

/**
 * Tests a string for valid hex values
 * @param str String to test
 * @returns True if the string contains valid hex, else false
 */
export const validHex = (str:string):boolean => {
  return /^[A-Fa-f0-9]+$/g.test(str)
}
