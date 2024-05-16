/**
 * @author Matthew Evans
 * @module @spongex/async-for-each
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

/**
  * Async version of forEach
  * @param array Array of items
  * @param callback Callback to run on each item
  */
export const asyncForEach = async (array:Array<any>, callback:Function):Promise<void> => {
  for (let index = 0; index < array.length; index++)
    await callback(array[index], index, array)
}
