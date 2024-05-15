/**
 * @author Matthew Evans
 * @module script-error
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

/**
 * Display an error message and exit script.
 * @param message Message to display.
 */
export const scriptError = (message:string, exit = true, code = 1):number => {
  if (exit) {
    console.error(`\x1b[31mError: ${message}  Exiting...\x1b[0m`)
    process.exit(code)
  }
  else {
    console.error(`\x1b[31mError: ${message}\x1b[0m`)
    return code
  }
}
