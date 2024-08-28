/**
 * @author Matthew Evans
 * @module spongex/pause
 * @see README.md
 * @copyright MIT see LICENSE.md
 */

export const pause = async (t:number):Promise<void> => {
  await new Promise(r => setTimeout(r, t))
}
