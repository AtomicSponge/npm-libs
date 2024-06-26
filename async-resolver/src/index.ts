/**
 * 
 * @author Matthew Evans
 * @module @spongex/async-resolver
 * @see README.md
 * @copyright MIT see LICENSE.md
 * 
 */

/**
 * Wrapper to Promise class to access functions
 * Used for waiting to receive asynchronous data
 */
export class AsyncResolver {
  /** Promise object */
  promise:Promise<any>
  /** Reject the resolver */
  reject:Function = () => {}
  /** Resolve the resolver */
  resolve:Function = () => {}
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}
