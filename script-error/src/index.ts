/**
 * @author Matthew Evans
 * @module script-error
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

interface scriptErrorOptions {
  exit?:boolean
  code?:number
}

/**
 * Display an error message and optionally quit running
 * @param message Message to display
 * @param options Options for scriptError
 * @param options.exit True to exit, false to return
 * @param options.code Return code
 * @returns Return code if script did not quit
 */
export const scriptError = (message:string, options?:scriptErrorOptions):number => {
  const _exit = (() => {
    if(options?.exit === undefined) return true
    else return options.exit
  })()
  const _code = (() => {
    if(options?.code === undefined) return 1
    else return options.code
  })()

  if (_exit) {
    console.error(`\x1b[31mError: ${message}  Exiting...\x1b[0m`)
    process.exit(_code)
  } else {
    console.error(`\x1b[31mError: ${message}\x1b[0m`)
    return _code
  }
}
